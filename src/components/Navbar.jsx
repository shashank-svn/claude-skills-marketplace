import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/skills?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Claude Skills Marketplace Icon"
                className="h-12 w-auto object-contain rounded-md"
              />
              <span className="text-xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight hidden sm:block">
                Claude Skills Marketplace
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search for skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/skills"
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Browse
            </Link>

            {currentUser?.role === "seller" && (
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-orange-500 font-medium"
              >
                Seller Dashboard
              </Link>
            )}

            {currentUser ? (
              <>
                {currentUser?.role !== "seller" && (
                  <Link
                    to="/cart"
                    className="text-gray-600 hover:text-orange-500 relative"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                )}

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile Settings
                      </Link>

                      {currentUser.role === "buyer" && (
                        <Link
                          to="/my-purchases"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Purchases
                        </Link>
                      )}
                      {currentUser.role === "seller" && (
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Seller Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-orange-500 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <form onSubmit={handleSearch} className="mb-4 mt-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </form>
            <Link
              to="/skills"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              Browse
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                >
                  Profile Settings
                </Link>
                {currentUser?.role !== "seller" && (
                  <Link
                    to="/cart"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  >
                    Cart ({cartItems.length})
                  </Link>
                )}
                {currentUser.role === "buyer" && (
                  <Link
                    to="/my-purchases"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  >
                    My Purchases
                  </Link>
                )}
                {currentUser.role === "seller" && (
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  >
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-orange-500 hover:bg-orange-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
