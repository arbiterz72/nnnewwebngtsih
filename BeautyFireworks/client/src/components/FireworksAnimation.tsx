import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { initializeFireworks } from "@/lib/fireworks";
import audioService from "@/lib/audioService";

interface FireworksAnimationProps {
  onNext: () => void;
}

export default function FireworksAnimation({
  onNext,
}: FireworksAnimationProps) {
  const [countdown, setCountdown] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownVisible, setCountdownVisible] = useState(false);
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  // Reference to fireworks controller
  const fireworksControllerRef = useRef<ReturnType<
    typeof initializeFireworks
  > | null>(null);

  useEffect(() => {
    // Initialize fireworks with canvas
    if (canvasRef.current) {
      fireworksControllerRef.current = initializeFireworks(canvasRef.current);
    }

    return () => {
      // Clean up
      if (countdownIntervalRef.current) {
        window.clearInterval(countdownIntervalRef.current);
      }
      // Stop fireworks when component unmounts
      if (fireworksControllerRef.current) {
        fireworksControllerRef.current.stopFireworks();
      }
      // Stop audio when component unmounts
      audioService.pause();
    };
  }, []);

  // Effect to start/stop fireworks based on visibility state
  useEffect(() => {
    if (!fireworksControllerRef.current) return;

    if (fireworksVisible) {
      fireworksControllerRef.current.startFireworks();
    } else {
      fireworksControllerRef.current.stopFireworks();
    }
  }, [fireworksVisible]);

  const startSequence = () => {
    setIsPlaying(true);
    setCountdownVisible(true);
    setFireworksVisible(false);

    // Start playing new background music when fireworks start
    // Start countdown with large font animation
    countdownIntervalRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          // Clear interval when countdown reaches 0
          if (countdownIntervalRef.current) {
            window.clearInterval(countdownIntervalRef.current);
          }

          // Hide countdown, show birthday message and fireworks
          setCountdownVisible(false);
          setFireworksVisible(true);
          setShowBirthdayMessage(true);

          // After 30 seconds of fireworks, show next button
          setTimeout(() => {
            setNextButtonVisible(true);
          }, 30000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // CSS styles for animations
  const playButtonStyle = {
    position: "relative" as const,
    overflow: "hidden" as const,
    boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
  };

  const countdownStyle = {
    textShadow:
      "0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 107, 149, 0.6)",
    animation: "countdownPulse 1s infinite",
  };

  const birthdayMessageStyle = {
    textShadow:
      "0 0 20px rgba(255, 105, 180, 0.9), 0 0 40px rgba(255, 105, 180, 0.6)",
    animation: "fadeIn 1s ease-out, pulse 2s infinite",
    background: "linear-gradient(90deg, #ff69b4, #f8a4c4, #ff69b4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  useEffect(() => {
    // Auto start sequence when component mounts
    startSequence();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <style>{`
        @keyframes countdownPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
      `}</style>

      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: "#000" }}
      ></canvas>

      {/* Controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        {countdownVisible && (
          <div
            className="text-8xl md:text-9xl text-white font-bold mb-4"
            style={countdownStyle}
          >
            {countdown}
          </div>
        )}

        {showBirthdayMessage && (
          <div className="text-center px-4">
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={birthdayMessageStyle}
            >
              Happy Birthday Marta!
            </h1>
          </div>
        )}

        {nextButtonVisible && (
          <Button
            onClick={() => {
              // Pause audio before navigating
              audioService.pause();
              onNext();
            }}
            className="bg-white/85 hover:bg-white text-success hover:text-green-600 font-bold py-5 px-14 rounded-full transition-all duration-300 font-['Poppins'] text-2xl mt-6 transform hover:scale-105"
            style={playButtonStyle}
          >
            <i className="fas fa-arrow-right mr-3"></i> Next
          </Button>
        )}
      </div>
    </div>
  );
}
