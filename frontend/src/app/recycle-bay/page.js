"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function RecycleBay() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION 1 */}
      <section id="recycle-bay" className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#66AC6E] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Recycle <span className="text-[#E3B214]">Bay</span>
              </h1>
              <div className="flex items-end space-x-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
                <span className="w-4 h-4 bg-[#E3B214] rounded-full"></span>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-4 font-bold">
              Siap Mengubah Sampah Jadi Karya?
            </p>

            <p className="text-lg leading-relaxed mb-4">
              Mulai dari rumah sendiri, kamu bisa berkontribusi untuk menjaga
              kebersihan lingkungan. Yuk, coba beberapa ide sederhana berikut
              untuk mendaur ulang barang bekas jadi karya yang berguna!
            </p>

            <p className="text-lg leading-relaxed">
              Coba lihat tumpukan botol plastik itu! Jangan anggap remeh! Di
              Indonesia banyak sampah numpuk dan bikin bumi sakit. Sampah yang
              kamu buang itu emas tersembunyi! Dengan sedikit ide kreatif,
              barang enggak guna bisa jadi sesuatu yang bermanfaat. Yuk, gas
              reuse, recycle, and re-create!
            </p>
          </div>
        </div>
      </section>

      {/* HERO SECTION 2 — Video Tutorials */}
      <section className="pb-12 px-4" id="fanwork">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ==================== CARD VIDEO 1 ==================== */}
            <div className="bg-white rounded-3xl shadow-xl p-0 overflow-hidden border border-gray-200">
              {/* Header Title */}
              <div className="bg-[#66AC6E] px-6 pt-6 pb-3 text-white rounded-t-3xl">
                <h3 className="text-xl font-semibold">
                  Pot Tanaman dari Botol Bekas
                </h3>
                <p className="text-sm opacity-90">Made at Theorem with love</p>
              </div>

              {/* YouTube Video */}
              <div
                className="relative cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://youtu.be/pdDs1bWLKsM?si=_opwDy4d6_wldaUP",
                    "_blank"
                  )
                }
              >
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/pdDs1bWLKsM"
                  title="Pot Tanaman dari Botol Bekas"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Cara Pembuatan */}
              <div className="p-6">
                <p className="font-semibold text-lg text-[#66AC6E]">
                  Cara <span className="text-[#f1c93b] ">Pembuatan :</span>
                </p>

                <ul className="text-gray-700 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>Potong bagian bawah botol plastik.</li>
                  <li>Buat lubang kecil di bagian dasar untuk aliran air.</li>
                  <li>Isi dengan tanah dan tanam bibit tanaman favoritmu.</li>
                </ul>

                <button
                  onClick={() =>
                    window.open(
                      "https://youtu.be/pdDs1bWLKsM?si=_opwDy4d6_wldaUP",
                      "_blank"
                    )
                  }
                  className="w-full bg-[#E3B214] hover:bg-[#E3B214] text-gray-800 font-semibold py-2.5 rounded-full mt-5"
                >
                  Lihat YouTube
                </button>
              </div>
            </div>

            {/* ==================== CARD VIDEO 2 ==================== */}
            <div className="bg-white rounded-3xl shadow-xl p-0 overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-[#66AC6E] px-6 pt-6 pb-3 text-white rounded-t-3xl">
                <h3 className="text-xl font-semibold">
                  Wadah Serbaguna dari Kardus Bekas
                </h3>
                <p className="text-sm opacity-90">Made at Theorem with love</p>
              </div>

              {/* Video */}
              <div
                className="relative cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://youtu.be/bupvkGiKBt0?si=1bkol8t7zUczn7EF",
                    "_blank"
                  )
                }
              >
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/bupvkGiKBt0"
                  title="Wadah Serbaguna dari Kardus Bekas"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Cara Pembuatan */}
              <div className="p-6">
                <p className="font-semibold text-lg text-[#66AC6E]">
                  Cara <span className="text-[#f1c93b]">Pembuatan :</span>
                </p>

                <ul className="text-gray-700 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>Potong kardus sesuai ukuran yang diinginkan.</li>
                  <li>Rekatkan sisi-sisinya menggunakan lem.</li>
                  <li>Hias dengan warna atau pola sesuai selera.</li>
                </ul>

                <button
                  onClick={() =>
                    window.open(
                      "https://youtu.be/bupvkGiKBt0?si=1bkol8t7zUczn7EF",
                      "_blank"
                    )
                  }
                  className="w-full bg-[#E3B214] hover:bg-[#f1c93b] text-gray-800 font-semibold py-2.5 rounded-full mt-5"
                >
                  Lihat YouTube
                </button>
              </div>
            </div>

            {/* ==================== CARD VIDEO 3 ==================== */}
            <div className="bg-white rounded-3xl shadow-xl p-0 overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-[#66AC6E] px-6 pt-6 pb-3 text-white rounded-t-3xl">
                <h3 className="text-xl font-semibold">Tas dari Kaos Lama</h3>
                <p className="text-sm opacity-90">Made at Theorem with love</p>
              </div>

              {/* Video */}
              <div
                className="relative cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://youtu.be/rcw0ch2fxn8?si=ajxR0C6K9ZwRZHRc",
                    "_blank"
                  )
                }
              >
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/rcw0ch2fxn8"
                  title="Tas dari Kaos Lama"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Cara Pembuatan */}
              <div className="p-6">
                <p className="font-semibold text-lg text-[#66AC6E]">
                  Cara <span className="text-[#f1c93b] ">Pembuatan :</span>
                </p>

                <ul className="text-gray-700 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>Gunting bagian lengan dan leher kaos.</li>
                  <li>Ikat bagian bawahnya agar tertutup rapat.</li>
                  <li>Tas ramah lingkungan siap digunakan!</li>
                </ul>

                <button
                  onClick={() =>
                    window.open(
                      "https://youtu.be/rcw0ch2fxn8?si=ajxR0C6K9ZwRZHRc",
                      "_blank"
                    )
                  }
                  className="w-full bg-[#E3B214] hover:bg-[#E3B214] text-gray-800 font-semibold py-2.5 rounded-full mt-5"
                >
                  Lihat YouTube
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maskot Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-[#66AC6E] rounded-[50px] shadow-2xl overflow-visible ml-0 md:ml-32">
              <div className="flex items-center py-8 md:py-12 pl-8 md:pl-40 pr-8 md:pr-12">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                    Menyukai <span className="text-[#E3B214]">Maskot</span>{" "}
                    Kami?
                  </h2>
                  <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl">
                    Kunjungi halaman fanwork kami untuk melihat hasil karya
                    sobat Bumi Bersih lainnya atau ikut serta dan upload karyamu
                    dan bantu sebarkan kesadaran isu kebersihan lingkungan.
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-3 ml-8">
                  <div className="flex gap-2 mr-2">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    <span className="w-3 h-3 bg-[#E3B214] rounded-full"></span>
                  </div>

                  <Link href="/fanwork">
                    <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap active:scale-95">
                      Lihat Fanwork
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:hidden px-8 pb-8">
                <Link href="/fanwork">
                  <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg w-full active:scale-95">
                    Lihat Fanwork
                  </button>
                </Link>
              </div>
            </div>

            <div className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[#66AC6E] p-2 shadow-2xl">
                  <div className="w-full h-full rounded-full border-8 border-[#E3B214] bg-white flex items-center justify-center">
                    <span className="text-gray-400 text-xs md:text-sm">
                      Image Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
       <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl shadow-xl p-8 md:p-10 text-center border-2 border-gray-100">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#66AC6E]">
              Apa yang Bisa <span className="text-[#66AC6E]">Kamu</span>{" "}
              <span className="text-yellow-500">Lakukan?</span>
            </h2>
            
            <p className="text-[#66AC6E] leading-relaxed mb-6 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang untuk menjaga kebersihan lingkungan dan memberi dampak nyata di sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E] hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap active:scale-95">
                  What To Do
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E] hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap active:scale-95">
                  Zero Waste Lifestyle
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
