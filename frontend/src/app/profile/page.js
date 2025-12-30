"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, User, LogOut, Camera } from "lucide-react";


/* ============================================================
   PROFILE EDIT PAGE
   ============================================================ */
export default function ProfileEditPage() {
  const [username, setUsername] = useState("YellowBird");
  const [email, setEmail] = useState("yellowbird@gmail.com");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
  window.location.href = "/edit-profile";   // ⬅ pindah halaman setelah klik
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">

       {/* SIDEBAR */}
       <div className="hidden lg:block w-64 p-6">
         <div className="bg-white border-4 border-[#66AC6E] rounded-3xl p-6 sticky top-24 shadow-lg">
           <ul className="space-y-3">

             {/* EDIT PROFILE ACTIVE */}
             <li>
               <Link 
                 href="/profile-edit"
                 className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium shadow-md transition-all duration-200"
                >
                 Edit Profile
               </Link>
              </li>

              <li>
                <Link 
                  href="/manage-fanwork"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                 Manage Fanwork
               </Link>
             </li>

              <li>
                <Link 
                  href="/fanwork-liked"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                 Liked Fanwork
               </Link>
             </li>
           </ul>
         </div>
       </div>

        {/* MAIN AREA */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-2xl mx-auto">

            {/* MOBILE TABS */}
            <div className="lg:hidden mb-6">
              <div className="bg-white border-2 border-[#66AC6E] rounded-2xl p-2 flex space-x-2">
                <button className="flex-1 px-4 py-2 rounded-xl bg-[#66AC6E] text-white font-medium text-sm">Edit Profile</button>
                <button className="flex-1 px-4 py-2 rounded-xl text-[#66AC6E] font-medium text-sm">Manage Fanwork</button>
                <button className="flex-1 px-4 py-2 rounded-xl text-[#66AC6E] font-medium text-sm">Liked Fanwork</button>
              </div>
            </div>

            {/* PROFILE PHOTO */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  {profileImage ? (
                    <img 
                      src="/icon/profil.svg" 
                      className="w-full h-full object-cover" 
                      alt="Profil" 
                   />
                  ) : (
                    <Image 
                       src="/icon/profil.svg"   // <--- PAKAI LOGO PROFIL DI SINI
                       alt="Default Profile"
                       width={128}
                       height={128}
                       className="w-full h-full object-cover"
                   />
                 )}
               </div>

               {/* UPLOAD BUTTON */}
               <label className="absolute bottom-0 right-0 bg-[#66AC6E] p-2 rounded-full border-4 border-white cursor-pointer hover:bg-green-700 transition">
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
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8">
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#66AC6E] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#66AC6E] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value="********"
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#E3B214] text-white py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-all hover:scale-[1.02] shadow-md mt-6"
                >
                  Edit Profil
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
          