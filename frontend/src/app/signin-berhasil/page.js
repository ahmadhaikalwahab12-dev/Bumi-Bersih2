"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SigninBerhasil() {
  const router = useRouter();

  const handleGoToSignIn = () => {
    router.push("/fanwork");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center px-4 py-8 sm:py-12">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT SIDE - ILLUSTRATION (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center p-6 lg:p-8 bg-white">
          <div className="relative w-full h-[300px] lg:h-[340px]">
            <Image
              src="/images/login.png"
              alt="Signin Success Illustration"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
            Sign Up<span className="text-yellow-300"> success!</span>
          </h1>

          {/* Button */}
          <button
            onClick={handleGoToSignIn}
            className="w-full max-w-xs bg-[#E3B214] hover:bg-yellow-400 text-white py-3 rounded-xl text-base sm:text-lg font-semibold transition-all shadow-md"
          >
            Kembali ke fanwork
          </button>
        </div>
      </div>
    </div>
  );
}