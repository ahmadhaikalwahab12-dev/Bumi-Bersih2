"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registrasi gagal");
      }

      router.push("/signup-berhasil");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8 sm:py-12">
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT SIDE - ILLUSTRATION (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center bg-white p-6 lg:p-8">
          <div className="relative w-full h-[320px] lg:h-[380px]">
            <Image
              src="/images/login.png"
              alt="Sign Up Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE - SIGN UP FORM */}
        <div className="bg-[#66AC6E] p-6 sm:p-8 md:p-12 text-white flex flex-col justify-center">
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            Sign <span className="text-yellow-400">Up</span>
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 sm:space-y-5">
            
            {/* Username Field */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                disabled={isLoading}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                disabled={isLoading}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 text-white placeholder:text-white/60 pr-12 outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-3 sm:mt-4 bg-[#E3B214] hover:bg-yellow-500 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>

            {/* Footer Link */}
            <div className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-yellow-300 underline hover:text-yellow-200">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}