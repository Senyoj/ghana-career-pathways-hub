import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById("main-content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-ghana-blue to-blue-dark text-white">
      <div className="absolute inset-0 hero-pattern"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Shape Your Future with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Explore careers, discover universities, and find your path to
            success after Senior High School in Ghana.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-ghana-gold text-ghana-blue hover:bg-gold-dark"
            >
              <a href="/courses">Explore SHS Courses</a>
            </Button>
            <Button
              asChild
              size="lg"
              // variant=""
              className="bg-blue-dark text-white hover:bg-gold-dark"
            >
              <a href="/careers">Discover Careers</a>
            </Button>
          </div>

          <button
            onClick={scrollToContent}
            className="mt-16 inline-flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
