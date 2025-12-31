"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // tambah loading state

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        
        console.log("API Response:", res.status);
        
        if (res.status === 200) {
          setIsLoggedIn(true);
          console.log("✅ LOGGED IN - isLoggedIn set to TRUE");
        } else {
          setIsLoggedIn(false);
          console.log("❌ NOT LOGGED IN - isLoggedIn set to FALSE");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Log setiap kali state berubah
  useEffect(() => {
    console.log("🔄 isLoggedIn changed to:", isLoggedIn);
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <nav className="fixed top-0 w-full bg-[#66AC6E] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center -translate-x-10">
              <div className="w-[60px] h-[40px] bg-white/20 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full bg-[#66AC6E] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO / PROFILE */}
          <div className="flex items-center -translate-x-10">
            {isLoggedIn ? (
              /* TAMPILKAN PROFILE */
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white">
                    <Image
                      src="/icon/profil.svg"
                      width={40}
                      height={40}
                      alt="Profile"
                    />
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full left-0 mt-3 w-44 bg-white rounded-xl shadow-xl py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* TAMPILKAN LOGO */
              <Link href="/">
                <Image src="/icon/logo.svg" width={60} height={40} alt="logo" />
              </Link>
            )}
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-white font-medium"
              >
                Home <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-lg py-2 w-52">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/what-to-do"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    What To Do
                  </Link>
                  <Link
                    href="/zero-waste-lifestyle"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Zero Waste Lifestyle
                  </Link>
                </div>
              )}
            </li>

            <Link href="/recycle-bay" className="text-white font-medium">
              Recycle Bay
            </Link>

            <Link href="/fanwork" className="text-white font-medium">
              Fanwork
            </Link>
          </ul>

          {/* SIGN IN BUTTON - HANYA TAMPIL JIKA BELUM LOGIN */}
          {!isLoggedIn && (
            <Link href="/sign-in" className="hidden md:block">
              <button className="bg-[#E3B214] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
                Sign In
              </button>
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block py-2 text-white">
              Home
            </Link>
            <Link href="/what-to-do" className="block py-2 text-white">
              What To Do
            </Link>
            <Link href="/zero-waste-lifestyle" className="block py-2 text-white">
              Zero Waste Lifestyle
            </Link>
            <Link href="/recycle-bay" className="block py-2 text-white">
              Recycle Bay
            </Link>
            <Link href="/fanwork" className="block py-2 text-white">
              Fanwork
            </Link>

            {isLoggedIn ? (
              <div className="bg-white rounded-xl shadow-md mt-3 py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700"
                >
                  Profile
                </Link>
                <button className="block w-full text-left px-4 py-2 text-red-500">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/sign-in">
                <button className="bg-[#E3B214] text-white px-6 py-2 rounded-lg w-full mt-2">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}