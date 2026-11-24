"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupBerhasil() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE - ILLUSTRATION */}
        <div className="hidden md:flex items-center justify-center p-6 lg:p-8 bg-white">
          <div className="relative w-full h-[300px] lg:h-[340px]">
            <Image
              src="/images/Login.png"
              alt="Signup Success Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE - SUCCESS CONTENT */}
        <div className="bg-gradient-to-b from-[#4DA065] to-[#3D7C51] p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[400px] sm:min-h-[450px]">

          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E3B214] rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Daftar <span className="text-yellow-300">Berhasil!</span>
          </h1>
          <p className="text-white/80 text-sm mb-8">Akun kamu sudah dibuat. Silakan masuk untuk mulai eksplorasi 🌿</p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => router.push("/sign-in")}
              className="w-full bg-[#E3B214] hover:bg-yellow-400 text-white py-3 rounded-xl text-base font-semibold transition-all shadow-md"
            >
              Masuk Sekarang
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl text-base font-semibold transition-all border border-white/40"
            >
              Ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
