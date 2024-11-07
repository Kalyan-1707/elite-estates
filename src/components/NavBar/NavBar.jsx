import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavElt = ({ label, to, dark = false }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
  
    return (
      <Link
        to={to}
        className={
          dark
            ? isActive
              ? "rounded-md px-3 py-2 text-lg font-medium bg-gray-700 text-white"
              : "rounded-md px-3 py-2 text-lg text-[#263238] font-medium hover:bg-gray-700 hover:text-white"
            : isActive
              ? "rounded-md px-3 py-2 text-lg font-medium bg-gray-700 text-white"
              : "rounded-md px-3 py-2 text-lg text-white font-medium hover:bg-gray-700 hover:text-white"
        }
      >
        {label}
      </Link>
    );
  };

function NavBar({ dark = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-transparent text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex bg-transparent items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {/* Left aligned items */}
              <NavElt label="Home" dark={dark} to="/" />
              <NavElt label="Search" dark={dark} to="/search" />
              <NavElt label="Wishlist" dark={dark} to="/wishlist" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:block">
            {/* Right aligned items */}
            <NavElt label="Login" dark={dark} to="/login" />
            <NavElt label="Signup" dark={dark} to="/signup" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2 fixed bg-black bg-opacity-60 w-screen">
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base text-white font-medium hover:bg-gray-700 hover:text-white"
            aria-current="page"
          >
            Home
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base text-white font-medium hover:bg-gray-700 hover:text-white"
          >
            Search
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base text-white font-medium hover:bg-gray-700 hover:text-white"
          >
            Wishlist
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base text-white font-medium hover:bg-gray-700 hover:text-white"
          >
            Login
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base text-white font-medium hover:bg-gray-700 hover:text-white"
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
