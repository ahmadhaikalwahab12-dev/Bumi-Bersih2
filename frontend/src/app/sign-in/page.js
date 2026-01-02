"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignIn() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.push("/signin-berhasil");
    } catch (error) {
      console.error("Google Sign In Error:", error);
    }
  };

  const handleSignIn = () => {
    console.log("Sign in with email:", email);
    router.push("/signin-berhasil");
  };

  return (
    <div className="min-h-screen bg-[#F4F2EA] flex items-center justify-center px-4 py-8 sm:py-12">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT SIDE - ILLUSTRATION (Hidden on mobile) */}
        <div className="hidden md:block relative bg-[#F8F8F8] p-6 lg:p-8">
          <div className="h-full flex items-center justify-center">
            <div className="relative w-full h-[300px] lg:h-[340px]">
              <Image
                src="/images/login.png"
                alt="Login Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - SIGN IN FORM */}
        <div className="bg-[#6FB07A] p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Sign <span className="text-[#F1C40F]">In</span>
            </h1>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#F1C40F] rounded-full" />
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-white/70 text-white py-2.5 sm:py-3 rounded-xl text-sm flex items-center justify-center gap-3 mb-5 sm:mb-6 hover:bg-white/10 transition"
          >
            <Image src="/icon/google.png" alt="Google Icon" width={18} height={18} />
            Lanjut dengan Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white/80">atau</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-1.5">
              Username atau Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#F1C40F]"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-white text-sm mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#F1C40F] pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-[#F1C40F] hover:bg-[#e0b50e] text-white font-semibold py-2.5 sm:py-3 rounded-xl transition shadow-md"
          >
            Sign In
          </button>

          {/* Footer Link */}
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="mt-4 sm:mt-5 text-xs sm:text-sm text-white/90 text-center hover:underline transition"
          >
            Baru? Buat akun di sini
          </button>
        </div>
      </div>
    </div>
  );
}