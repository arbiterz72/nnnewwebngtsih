import { useState } from "react";
import { useLocation } from "wouter";
import PinVerification from "@/components/PinVerification";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleSuccess = () => {
    setLocation("/fireworks");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{
           backgroundImage: "url('https://www.transparenttextures.com/patterns/hearts.png')",
           backgroundSize: "100px 100px",
           backgroundColor: "#ffcccc"
         }}>
      <PinVerification onSuccess={handleSuccess} />
    </div>
  );
}
