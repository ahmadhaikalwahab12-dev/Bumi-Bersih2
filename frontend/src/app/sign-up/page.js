"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ===================== SIGN UP PAGE ===================== */
export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setTimeout(() => {
      router.push("/signup-berhasil");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8 sm:py-12">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT — ILLUSTRATION (MENYATU) - Hidden on mobile */}
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

        {/* RIGHT — SIGN UP FORM */}
        <div className="bg-[#66AC6E] p-6 sm:p-8 md:p-12 text-white flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            Sign <span className="text-yellow-400">Up</span>
          </h1>

          <div className="space-y-4 sm:space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 
                           text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 
                           text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1.5 sm:mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 
                             text-white placeholder:text-white/60 pr-12 outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-3 sm:mt-4 bg-[#E3B214] hover:bg-yellow-500 
                         text-white font-semibold py-2.5 sm:py-3 rounded-xl 
                         transition-all hover:scale-[1.02] shadow-lg"
            >
              Sign Up
            </button>

            {/* Footer */}
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