import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 border-t border-orange-100 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-lg font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Claude Skills Marketplace
              </span>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              The premier marketplace for reusable AI capability packages.
            </p>
          </div>

          <div className="flex space-x-6 text-sm text-gray-500">
            <Link
              to="/about"
              className="hover:text-orange-500 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-pink-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/terms"
              className="hover:text-purple-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-orange-500 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-orange-100 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Claude Skills Marketplace. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};
