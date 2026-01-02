"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileEditForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* LOAD USER DARI PRISMA (BERDASARKAN SESSION) */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/user/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUsername(data.username || "");
        setEmail(data.email || "");
        setProfileImage(data.avatar || null); 
      } catch (err) {
        console.error(err);
        window.location.href = "/sign-in";
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* UPDATE REALTIME KE PRISMA */
  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui profil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Memuat data profil...</p>
      </div>
    );
  }

  const isExternalImage =
    typeof profileImage === "string" && profileImage.startsWith("http");

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center py-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10">

        {/* FOTO PROFIL */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden">
              <Image
                src={profileImage || "/icon/profil.svg"} 
                width={130}
                height={130}
                alt="Profil"
                className="object-contain"
                unoptimized={isExternalImage} 
              />
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full px-4 py-3 border rounded-lg border-[#66AC6E] bg-[#F1FAF1]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-2 w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-8 w-full bg-[#E3B214] hover:bg-[#c99b0f] text-white font-semibold py-3 rounded-lg transition shadow-md disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Konfirmasi Perubahan"}
        </button>
      </div>
    </div>
  );
}
