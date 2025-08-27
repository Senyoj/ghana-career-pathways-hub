
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ghana-blue text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Ghana Career Pathways</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Guiding Ghanaian SHS students to make informed decisions about their educational and career paths.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition">
                  SHS Courses
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition">
                  Career Exploration
                </Link>
              </li>
              <li>
                <Link to="/universities" className="text-gray-300 hover:text-white transition">
                  Universities & Colleges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <a 
              href="mailto:info@ghanacareerpath.edu.gh" 
              className="flex items-center text-gray-300 hover:text-white transition mb-2"
            >
              <Mail className="h-4 w-4 mr-2" />
              info@ghanacareerpath.edu.gh
            </a>

            <h3 className="text-lg font-bold mb-4 mt-6 text-white">Resources</h3>
            <a 
              href="https://www.moe.gov.gh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition mb-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ministry of Education
            </a>
            <a 
              href="https://www.wes.org/advisor-blog/ghana-education-system/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ghana Education System Guide
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-dark mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Ghana Career Pathways Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
