"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // ✅ Daftar halaman yang TIDAK menampilkan footer
  const hideFooterPages = [
    "/signin",
    "/signup", 
    "/signin-berhasil",
    "/signup-berhasil",
    "/sign-in",
    "/sign-up"
  ];
  
  // ✅ Cek apakah halaman saat ini ada di daftar
  const shouldHide = hideFooterPages.some(page => pathname?.startsWith(page));
  
  if (shouldHide) {
    return null; // Tidak render footer
  }

  return (
    <footer className="bg-[#66AC6E] text-white">
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ekspresikan dukunganmu!</h3>
            <p className="text-white/90">
              Marilah berpartisipasi dalam menyebarkan kesadaran tentang isu
              kebersihan lingkungan dengan cara mengupload karya fanwork terkait
              maskot Bumi Bersih.
            </p>
          </div>

          {/* ✅ LANGSUNG KE PAGE FANWORK */}
          <Link href="/fanwork">
            <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap active:scale-95">
              Upload Karyamu!
            </button>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/30 mx-4 md:mx-[180px]"></div>

      {/* Footer Main */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <p className="text-white/90">
              Bumi Bersih mengedepankan kreativitas sebagai solusi penganganan
              isu kebersihan lingkungan di Indonesia.
            </p>
          </div>

          <div className="lg:pl-[100px]">
            <h3 className="font-bold text-lg mb-4">Info Page</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="font-inter text-white/90 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/what-to-do"
                  className="font-inter text-white/90 hover:text-white transition"
                >
                  What To Do
                </Link>
              </li>
              <li>
                <Link
                  href="/zero-waste-lifestyle"
                  className="font-inter text-white/90 hover:text-white transition"
                >
                  Zero Waste Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Crafts and Fanwork</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recycle-bay"
                  className="font-inter text-white/90 hover:text-white transition"
                >
                  Recycle Bay
                </Link>
              </li>
              <li>
                <Link
                  href="/fanwork"
                  className="font-inter text-white/90 hover:text-white transition"
                >
                  Fanwork
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}