import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PinVerificationProps {
  onSuccess: () => void;
}

export default function PinVerification({ onSuccess }: PinVerificationProps) {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startJourney = () => {
    setShowPinInput(true);
  };

  const verifyPin = () => {
    const correctPIN = "19032004";
    setIsLoading(true);

    setTimeout(() => {
      if (pin === correctPIN) {
        setMessage("PIN Benar! Klik Next untuk kejutan! ✨");
        setIsSuccess(true);
        setIsError(false);
        setShowNext(true);
      } else {
        setMessage("Maaf, PIN salah. Masukkan ulang ya! 🙏");
        setIsError(true);
        setIsSuccess(false);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPin();
  };

  const handleNext = () => {
    const successSound = new Audio("https://f.top4top.io/m_3362hl6qy1.mp3");
    successSound.play()
      .then(() => {
        onSuccess();
      })
      .catch(error => console.log("Audio play failed:", error));
  };

  return (
    <div className="relative">
      {!showPinInput ? (
        <Card className="w-full max-w-md rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
          <CardContent className="p-12 text-center bg-gradient-to-br from-pink-50 to-white">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600">
              Selamat Datang!
            </h2>
            <Button 
              onClick={startJourney}
              className="w-full bg-gradient-to-r from-primary to-pink-600 hover:opacity-90 text-white font-semibold py-6 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1"
            >
              ✨ Mulai Perjalanan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500">
          <CardContent className="p-8 bg-gradient-to-br from-pink-50 to-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600">
                HAI, MARTA
              </h2>
              <p className="text-gray-600">Masukkan PINnya dulu ya 😊</p>
            </div>

            <div className="photo-frame mx-auto mb-8 hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://raw.githubusercontent.com/arbiterz72/bayuaja/main/WhatsApp%20Image%202025-03-16%20at%2002.46.27.jpeg" 
                alt="Marta"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className={`text-center text-2xl tracking-[0.5em] h-14 rounded-xl border-2 ${
                    isSuccess ? 'border-green-500' : isError ? 'border-red-500' : 'border-primary/20'
                  } focus:border-primary focus:ring-primary/30 transition-all duration-300`}
                  placeholder="• • • • • • • •"
                  maxLength={8}
                  disabled={isLoading}
                />
                <div className="h-6 mt-2">
                  {message && (
                    <p className={`text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'} animate-fade-in`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {!showNext && (
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-pink-600 hover:opacity-90 text-white font-semibold py-5 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
                    disabled={isLoading || pin.length !== 8}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Verifikasi PIN"
                    )}
                  </Button>
                )}

                {showNext && (
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 text-white font-semibold py-5 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1"
                  >
                    Lanjutkan ✨
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}