"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Gagal membuat session");
      router.push("/signin-berhasil");
    } catch (err) {
      setError("Google Sign In gagal. Coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Gagal membuat session");
      router.push("/signin-berhasil");
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Email atau password salah");
      } else {
        setError("Login gagal. Coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2EA] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        <div className="hidden md:block relative bg-[#F8F8F8] p-6 lg:p-8">
          <div className="h-full flex items-center justify-center">
            <div className="relative w-full h-[300px] lg:h-[340px]">
              <Image src="/images/Login.png" alt="Login" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        <div className="bg-[#6FB07A] p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Sign <span className="text-[#F1C40F]">In</span>
            </h1>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#F1C40F] rounded-full" />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-300 rounded-lg text-white text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full border border-white/70 text-white py-2.5 sm:py-3 rounded-xl text-sm flex items-center justify-center gap-3 mb-5 sm:mb-6 hover:bg-white/10 transition disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Image src="/icon/google.png" alt="Google" width={18} height={18} />
            )}
            Lanjut dengan Google
          </button>

          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white/80">atau</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-1.5">Username atau Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#F1C40F]"
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label className="block text-white text-sm mb-1.5">Password</label>
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

          <button
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full bg-[#F1C40F] hover:bg-[#e0b50e] text-white font-semibold py-2.5 sm:py-3 rounded-xl transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            Sign In
          </button>

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