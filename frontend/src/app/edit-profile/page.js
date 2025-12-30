"use client"; 

import Image from "next/image";
import { useState } from "react";

export default function ProfileEditForm() {
  const [username, setUsername] = useState("Verdinanda56");
  const [email, setEmail] = useState("Verdinanda56@gmail.com");
  const [password, setPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("********");

  // ➤ Fungsi Notifikasi
  const handleSubmit = () => {
    alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center py-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/icon/profil.svg"
                width={130}
                height={130}
                alt="Profil Icon"
                className="object-contain"
              />
            </div>

            {/* Edit Button */}
            <button className="absolute bottom-2 right-2 text-white p-2 rounded-md transition">
              <Image
                src="/icon/up.svg"
                width={25}
                height={25}
                alt="Upload Icon"
              />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              className="mt-2 w-full px-4 py-3 border rounded-lg border-[#66AC6E] bg-[#F1FAF1] focus:ring-2 focus:ring-[#66AC6E] outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 border rounded-lg border-[#66AC6E] bg-[#F1FAF1] focus:ring-2 focus:ring-[#66AC6E] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="mt-2 w-full px-4 py-3 border rounded-lg border-[#66AC6E] bg-[#F1FAF1] focus:ring-2 focus:ring-[#66AC6E] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-2 w-full px-4 py-3 border rounded-lg border-[#66AC6E] bg-[#F1FAF1] focus:ring-2 focus:ring-[#66AC6E] outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Agreement */}
        <p className="text-xs text-gray-600 mt-6 text-center leading-relaxed">
          Dengan melanjutkan, anda setuju dengan Kebijakan Publikasi serta{" "}
          <span className="underline cursor-pointer">Syarat dan Ketentuan</span> kami.
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-[#E3B214] hover:bg-[#c99b0f] text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Konfirmasi Perubahan
        </button>
      </div>
    </div>
  );
}
