import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real implementation, we would navigate to search results
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-ghana-blue" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="text-ghana-blue hover:text-blue-dark px-3 py-2 font-medium"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-ghana-blue hover:text-blue-dark px-3 py-2 font-medium"
            >
              SHS Courses
            </Link>
            <Link
              to="/careers"
              className="text-ghana-blue hover:text-blue-dark px-3 py-2 font-medium"
            >
              Careers
            </Link>
            <Link
              to="/universities"
              className="text-ghana-blue hover:text-blue-dark px-3 py-2 font-medium"
            >
              Universities
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-ghana-blue hover:text-blue-dark focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input
              type="text"
              placeholder="Search careers, courses..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-ghana-blue hover:bg-muted"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-ghana-blue hover:bg-muted"
          >
            SHS Courses
          </Link>
          <Link
            to="/careers"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-ghana-blue hover:bg-muted"
          >
            Careers
          </Link>
          <Link
            to="/universities"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-ghana-blue hover:bg-muted"
          >
            Universities
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
