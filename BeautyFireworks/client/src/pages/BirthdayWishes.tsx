import { useEffect, useState, useRef } from "react";
import audioService from "@/lib/audioService";

export default function BirthdayWishes() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    setIsAudioPlaying(audioService.getIsPlaying());

    const syncInterval = setInterval(() => {
      setIsAudioPlaying(audioService.getIsPlaying());
    }, 1000);

    window.scrollTo(0, 0);

    return () => {
      clearInterval(syncInterval);
    };
  }, []);

  const toggleAudio = () => {
    audioService
      .toggle()
      .then(() => {
        setIsAudioPlaying(audioService.getIsPlaying());
      })
      .catch((err) => console.log("Unable to toggle music:", err));
  };

  const playMemoryAudio = (url) => {
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
      audioRef.current.load();
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 to-purple-100 min-h-screen">
      {/* Audio control button */}
      <div
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-pink-500/80 hover:bg-pink-600 flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm"
        onClick={toggleAudio}
        style={{ boxShadow: "0 0 15px rgba(255, 105, 180, 0.5)" }}
      >
        <i
          className={`fas ${isAudioPlaying ? "fa-volume-up" : "fa-volume-mute"}`}
          style={{ color: "#fff", fontSize: "1.2rem" }}
        ></i>
      </div>

      {/* Header Section */}
      <div className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-400/50 to-purple-500/50 z-0"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-pink-600 drop-shadow-lg animate-[fadeIn_1s_ease-in]">
            Happy Birthday, Marta!
          </h1>

          <div className="photo-frame mb-8">
            <div className="photo-wrapper">
              <img
                src="https://raw.githubusercontent.com/arbiterz72/bayuaja/main/WhatsApp%20Image%202025-03-16%20at%2002.46.27.jpeg"
                alt="Marta"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-purple-800 mb-6 font-medium leading-relaxed">
            Sayang, di hari spesialmu ini, aku ingin mengucapkan selamat ulang
            tahun yang ke-20! Semoga tahun barumu dipenuhi dengan kebahagiaan,
            kesehatan, dan kesuksesan dalam segala hal yang kamu lakukan.
          </p>
        </div>
      </div>

      {/* Memory Section */}
      <div className="py-20 px-6 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-pink-600 relative">
            <span className="relative z-10">Memories</span>
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-pink-200 z-0">
              Memories
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Memory Cards */}
            <MemoryCard
              imageSrc="/assets/panda.jpeg"
              date="25 Februari 2025"
              text="Bayangkan betapa bahagianya hari itu saat kita pertama kali bertemu. Senyummu telah mencuri hatiku sejak saat itu."
              onClick={() =>
                playMemoryAudio("https://f.top4top.io/m_3362ajxgl1.mp3")
              }
            />

            <MemoryCard
              imageSrc="/assets/WhatsApp Image 2025-03-16 at 02.46.27.jpeg"
              date="15 Maret 2025"
              text="Momen berharga saat kita bersama. Kadang tanpa sadar aku tersenyum sendiri mengingat candaan dan tawamu."
              onClick={() =>
                playMemoryAudio("https://g.top4top.io/m_336201ch51.mp3")
              }
            />

            <MemoryCard
              imageSrc="/assets/marta.jpeg"
              date="16 Maret 2025"
              text="Hari ulang tahunmu. Lihat betapa cantiknya kamu, dan begitu berharganya kamu dalam hidupku."
              onClick={() =>
                playMemoryAudio("https://f.top4top.io/m_3362ajxgl1.mp3")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MemoryCard({ imageSrc, date, text, onClick }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-60 overflow-hidden">
        <img
          src={imageSrc}
          alt="Memory"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-pink-500 mb-2 font-medium">{date}</p>
        <p className="text-gray-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
