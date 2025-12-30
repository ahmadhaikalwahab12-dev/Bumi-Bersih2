"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuizCard from "../components/QuizCard";


export default function FanwokLiked() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section id="fanwork" className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#66AC6E] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Fan<span className="text-yellow-400">work</span>
              </h1>
              <div className="flex items-end space-x-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
                <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              </div>
            </div>

            <p className="text-lg font-bold mb-4">
              Ayo ekspresikan kreativitas serta dukunganmu terhadap website Bumi Bersih dengan membuat sebuah karya
            </p>

            <p className="text-lg mb-4">
              yang terinspirasi dari maskot kami, yaitu Fora dan Fana! Tunjukkan imajinasimu melalui gambar, ilustrasi,
              atau kerajinan unik lainnya.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mx-8 mb-8 max-w-full flex justify-center items-end h-[526px] bg-[url(/images/img_plc.svg)]">
            <div>
              <button className="mb-12 bg-[#E3B214] hover:bg-yellow-500 text-white font-bold py-3 px-12 rounded-full transition-all hover:scale-105 shadow-lg">
                Upload Karyamu!
              </button>
            </div>
          </div>

          <QuizCard />
        </div>
      </section>

    </div>
  );
}
