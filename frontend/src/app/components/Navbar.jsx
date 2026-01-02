"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronDown, X, Menu, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔍 SEARCH STATE (TAMBAHAN)
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  /* 🔐 CEK SESSION */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        setIsLoggedIn(res.status === 200);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  /* 🚪 SIGN OUT */
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    router.push("/sign-in");
  };

  // 🔍 HANDLE SEARCH (TAMBAHAN)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/fanwork?search=${encodeURIComponent(search)}`);
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/signin-berhasil" ||
    pathname === "/signup-berhasil"
  ) {
    return null;
  }

  if (isLoading) {
    return (
      <nav className="fixed top-0 w-full bg-[#66AC6E] shadow-md z-50">
        <div className="h-16 flex items-center px-6">
          <div className="w-24 h-8 bg-white/20 animate-pulse rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full bg-[#66AC6E] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image src="/icon/logo.svg" width={60} height={40} alt="logo" />
          </Link>

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
                  <Link href="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                  <Link href="/what-to-do" className="block px-4 py-2 hover:bg-gray-100">What To Do</Link>
                  <Link href="/zero-waste-lifestyle" className="block px-4 py-2 hover:bg-gray-100">
                    Zero Waste Lifestyle
                  </Link>
                </div>
              )}
            </li>

            <Link href="/recycle-bay" className="text-white font-medium">Recycle Bay</Link>
            <Link href="/fanwork" className="text-white font-medium">Fanwork</Link>
          </ul>

          {/* 🔍 SEARCH BAR KHUSUS FANWORK */}
          {pathname === "/fanwork" && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-white rounded-lg px-3 py-1 w-[320px]"
            >
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Ketik untuk mencari di Fanwork..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </form>
          )}

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center">
            {!isLoggedIn ? (
              <Link href="/sign-in">
                <button className="bg-[#E3B214] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white"
                >
                  <Image src="/icon/profil.svg" width={40} height={40} alt="Profile" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl py-2">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
