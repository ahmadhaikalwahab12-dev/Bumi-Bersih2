"use client";

import Link from "next/link";
import React, { useState } from "react";
const { ChevronDown, X, Menu } = require("lucide-react");
const { default: Image } = require("next/image");

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="fixed top-0 w-full bg-[#66AC6E] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="w-15 h-15 flex items-center justify-center">
              <Image src="/icon/logo.svg" width={300} height={300} alt="logo" />
            </div>
          </Link>

          <ul className="hidden md:flex space-x-8 items-center">
            <li className="relative group">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-white hover:text-green-200 font-medium"
              >
                <div className="font-inter">Home</div>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                  <Link
                    href="/"
                    className="font-inter block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Home
                  </Link>
                  <Link
                    href="/what-to-do"
                    className="font-inter block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    What To Do
                  </Link>
                  <Link
                    href="/zero-waste-lifestyle"
                    className="font-inter block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Zero Waste Lifestyle
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/recycle-bay"
                className="font-inter text-white hover:text-green-300 font-medium"
              >
                Recycle Bay
              </Link>
            </li>

            <li>
              <Link
                href="/fanwork"
                className="font-inter text-white hover:text-green-300 font-medium"
              >
                Fanwork
              </Link>
            </li>
          </ul>

          <Link href="/sign-in">
            <button className="font-inter hidden md:block bg-[#E3B214] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
              Sign In
            </button>
          </Link>

          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-white hover:text-green-300"
            >
              Home
            </Link>
            <Link
              href="/what-to-do"
              className="block py-2 text-white hover:text-green-300"
            >
              What To Do
            </Link>
            <Link
              href="/zero-waste-lifestyle"
              className="block py-2 text-white hover:text-green-300"
            >
              Zero Waste Lifestyle
            </Link>
            <Link
              href="/recycle-bay"
              className="block py-2 text-white hover:text-green-300"
            >
              Recycle Bay
            </Link>
            <Link
              href="/fanwork"
              className="block py-2 text-white hover:text-green-300"
            >
              Fanwork
            </Link>
            <button className="bg-[#E3B214] text-white px-6 py-2 rounded-lg w-full mt-2">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}