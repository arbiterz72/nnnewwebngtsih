import { useLocation } from "wouter";
import FireworksAnimation from "@/components/FireworksAnimation";

export default function Fireworks() {
  const [, setLocation] = useLocation();

  const handleNext = () => {
    // Navigate to birthday wishes page
    setLocation("/wishes");
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <FireworksAnimation onNext={handleNext} />
    </div>
  );
}
