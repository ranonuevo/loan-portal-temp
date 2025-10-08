import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, QrCode } from "lucide-react";

const WelcomeHero = () => {
  return (
    <div className="min-h-screen bg-navy-bg flex flex-col relative">
      {/* Menu Icon */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="text-text-light hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Hero Heading with Gradient */}
        <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-marhaba bg-clip-text text-transparent animate-fade-in">
          Marhaba!
        </h1>

        {/* Subtitle */}
        <div className="text-center space-y-2 mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-text-light text-lg md:text-xl font-medium">
            Explore. Bank. Connect.
          </p>
          <p className="text-text-muted text-base md:text-lg">
            Your lifestyle super app at your fingertips
          </p>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          variant="hero"
          size="lg"
          className="w-full max-w-sm h-14 rounded-full text-lg font-medium mb-8 animate-fade-in transition-all duration-300"
          style={{ animationDelay: "0.2s" }}
        >
          <Link href="/mobile">Start exploring</Link>
        </Button>

        {/* Login Link */}
        <p className="text-text-muted text-sm md:text-base mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Already have an account?{" "}
          <button className="text-text-light font-medium hover:underline transition-all">
            Login
          </button>
        </p>

        {/* QR Code Section */}
        <div className="flex items-center gap-3 text-text-muted text-sm md:text-base animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <QrCode className="h-6 w-6 text-coral" />
          <p>
            <span className="text-text-light">Under 18?</span> Scan the QR code!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
