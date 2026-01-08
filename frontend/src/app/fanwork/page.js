"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import QuizCard from "@/app/components/QuizCard";
import UploadFanwork from "@/app/components/UploadFanwork";

export default function Fanwork() {
  const [showUploadModal, setShowUploadModal] = useState(false);

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

            <p className="text-lg leading-relaxed mb-4 font-bold">
              Hobi menggambar dan membuat kerajinan lainnya?
            </p>

            <p className="text-lg leading-relaxed">
              Ayo ekspresikan kreativitas serta dukunganmu terhadap website Bumi Bersih dengan membuat sebuah karya yang terinspirasi dari maskot kami, 
              yaitu Fora dan Fana! Tunjukkan imajinasimu melalui gambar, ilustrasi, atau kerajinan unik lainnya, 
              dan jadilah bagian dari gerakan untuk menjaga bumi tetap bersih dan lestari.
            </p>
          </div>
        </div>
      </section>

      {/* UPLOAD SECTION */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mx-8 mb-8 relative flex justify-center items-end h-[526px] rounded-2xl overflow-hidden">
            <Image
              src="/images/Fanwork.png"
              fill
              alt="Fanwork Illustration"
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <button
              onClick={() => setShowUploadModal(true)}
              className="relative z-10 mb-12 bg-[#E3B214] hover:bg-yellow-500 text-white font-bold py-3 px-12 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Upload Karyamu!
            </button>
          </div>

          {/* GRID FANWORK */}
          <QuizCard />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#66AC6E] mb-6">
              Apa yang Bisa <span className="text-yellow-500">Kamu</span>{" "}
              <span className="text-[#66AC6E]">Lakukan?</span>
            </h2>

            <p className="text-[#66AC6E] text-lg mb-8 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang
              untuk menjaga kebersihan lingkungan dan memberi dampak nyata di sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/what-to-do">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  What To Do
                </button>
              </Link>
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Zero Waste Lifestyle
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Recycle Bay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUploadModal(false)}
          />

          <div className="relative z-50 w-full max-w-2xl">
            <UploadFanwork
              onClose={() => setShowUploadModal(false)}
              onSuccess={() => {
                // nanti bisa trigger refresh realtime di sini
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}