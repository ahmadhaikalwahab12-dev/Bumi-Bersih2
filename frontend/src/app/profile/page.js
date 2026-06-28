"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

export default function ProfileEditPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* 🔹 LOAD PROFILE DARI PRISMA */
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
        setProfileImage(data.avatar || null); // ✅ FIX FIELD
      } catch (error) {
        console.error("Load profile error:", error);
        window.location.href = "/sign-in";
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* 🔹 HANDLE IMAGE (BASE64 / URL) */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* 🔹 SAVE TO PRISMA */
  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          avatar: profileImage || undefined, //
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profil berhasil diperbarui");
    } catch (error) {
      alert("Gagal memperbarui profil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const isExternalImage =
    typeof profileImage === "string" && profileImage.startsWith("http");

  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">

        {/* SIDEBAR */}
        <div className="hidden lg:block w-64 p-6">
          <div className="bg-white border-4 border-[#66AC6E] rounded-3xl p-6 sticky top-24 shadow-lg">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/profile-edit"
                  className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-fanwork"
                  className="block px-4 py-3 text-[#66AC6E]"
                >
                  Manage Fanwork
                </Link>
              </li>
              <li>
                <Link
                  href="/fanwork-liked"
                  className="block px-4 py-3 text-[#66AC6E]"
                >
                  Liked Fanwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-2xl mx-auto">

            {/* PROFILE PHOTO */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={profileImage || "/icon/profil.svg"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    unoptimized={isExternalImage}
                  />
                </div>

                <label className="absolute bottom-0 right-0 bg-[#66AC6E] p-2 rounded-full border-4 border-white cursor-pointer">
                  <Camera size={18} className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    value={email}
                    readOnly
                    className="w-full px-4 py-3 border-2 bg-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Password</label>
                  <input
                    value="********"
                    readOnly
                    className="w-full px-4 py-3 border-2 bg-gray-100 rounded-xl"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full bg-[#E3B214] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Edit Profil"}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
