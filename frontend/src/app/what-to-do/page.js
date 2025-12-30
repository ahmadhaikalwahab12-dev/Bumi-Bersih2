"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WhatToDo() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION 1 */}
      <section id="what-to-do" className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#66AC6E] rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
                What To <span className="text-[#E3B214]">Do</span>
              </h1>
              <div className="flex items-end space-x-2">
                <span className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></span>
                <span className="w-3 h-3 sm:w-4 sm:h-4 bg-[#E3B214] rounded-full"></span>
              </div>  
            </div>

            <p className="text-base sm:text-lg leading-relaxed mb-4">
              Perubahan dimulai dari tindakan kecil. Dengan memilah sampah,
              mengurangi plastik sekali pakai, dan menjaga kebersihan sekitar,
              setiap individu dapat berkontribusi menciptakan lingkungan yang
              lebih sehat. Temukan solusi sederhana yang bisa kamu lakukan
              mulai hari ini.
            </p>

            <p className="text-base sm:text-lg leading-relaxed mb-4">
              Yuk mulai langkah kecil untuk lingkungan yang lebih bersih!
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Untuk menciptakan lingkungan bersih dan sehat, terdapat beberapa
              langkah sederhana yang dapat dilakukan yaitu:
            </p>
          </div>
        </div>
      </section>

      {/* HERO SECTION 2 */}
      <section className="pt-6 pb-20 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* ITEM 1 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Sosialisasi.png"
                  alt="Sosialisasi dan Himbauan"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#66AC6E]">Melakukan </span>
                <span className="text-[#E3B214]">Sosialisasi </span>
                <span className="text-[#66AC6E]">dan </span>
                <span className="text-[#E3B214]">Himbauan</span>
                <span className="text-[#66AC6E]"> kepada Masyarakat </span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Kegiatan sosialisasi dan penyuluhan menjadi langkah penting untuk menumbuhkan kepedulian terhadap lingkungan. 
                Melalui ajakan yang berkelanjutan, masyarakat diharapkan semakin memahami pentingnya menjaga kebersihan bersama.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-[#66AC6E]" />

          {/* ITEM 2 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#66AC6E]">Membuang </span>
                <span className="text-[#E3B214]">Sampah </span>
                <span className="text-[#66AC6E]">pada Tempatnya</span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Kedisiplinan dalam membuang sampah di tempat yang telah disediakan merupakan kebiasaan dasar yang perlu dibiasakan sejak dini. 
                Langkah kecil ini dapat memberikan dampak besar terhadap kebersihan lingkungan sekitar.
              </p>
            </div>

            <div className="flex items-center justify-center order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Buang sampah.png"
                  alt="Buang Sampah"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[#66AC6E]" />

          {/* ITEM 3 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Reduce.png"
                  alt="Reduce Sampah"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#66AC6E]">Mengurangi </span>
                <span className="text-[#E3B214]">Produksi Sampah</span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Mengurangi penggunaan plastik sekali pakai, membawa wadah pribadi, dan memilih produk ramah lingkungan merupakan cara sederhana namun efektif 
                untuk menekan jumlah sampah yang dihasilkan setiap hari.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-[#66AC6E]" />

          {/* ITEM 4 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#66AC6E]">Melakukan </span>
                <span className="text-[#E3B214]">Daur Ulang</span>
                <span className="text-[#66AC6E]"> Sampah</span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Sampah yang masih bisa dimanfaatkan sebaiknya diolah kembali menjadi produk baru. Selain membantu mengurangi volume sampah,      
                kegiatan ini juga dapat menjadi bentuk kreativitas dan kepedulian terhadap lingkungan.
              </p>
            </div>

            <div className="flex items-center justify-center order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Daur ulang.png"
                  alt="Daur Ulang"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[#66AC6E]" />

          {/* ITEM 5 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Recycle.png"
                  alt="Reuse"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#E3B214]">Memanfaatkan </span>
                <span className="text-[#66AC6E]">Barang-Barang Bekas</span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Kegiatan sosialisasi dan penyuluhan menjadi langkah penting untuk menumbuhkan kepedulian terhadap lingkungan. 
                Melalui ajakan yang berkelanjutan, masyarakat diharapkan semakin memahami pentingnya menjaga kebersihan bersama.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-[#66AC6E]" />

          {/* ITEM 6 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                <span className="text-[#66AC6E]">Mengikuti Program </span>
                <span className="text-[#E3B214]">&quot;Operasi Semut&quot;</span>
              </h2>
              <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed">
                Kegiatan gotong royong seperti Operasi Semut dapat menjadi sarana membangun kebersamaan 
                sekaligus meningkatkan rasa tanggung jawab terhadap lingkungan sekitar.
              </p>
            </div>

            <div className="flex items-center justify-center order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/What to do Operasi semut.png"
                  alt="Operasi Semut"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maskot Section - REDESIGNED */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Background Green Container */}
            <div className="bg-[#66AC6E] rounded-3xl sm:rounded-[50px] shadow-2xl overflow-visible ml-0 sm:ml-16 md:ml-32">
              <div className="flex flex-col md:flex-row items-center py-6 sm:py-8 md:py-12 pl-6 sm:pl-8 md:pl-40 pr-6 sm:pr-8 md:pr-12 gap-4 md:gap-0">
                
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                    Menyukai <span className="text-[#E3B214]">Maskot</span> Kami?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto md:mx-0">
                    Kunjungi halaman fanwork kami untuk melihat hasil karya sobat Bumi Bersih lainnya atau ikut serta dan 
                    upload karyamu dan bantu sebarkan kesadaran isu kebersihan lingkungan.
                  </p>
                </div>

                {/* Button + Dots Area - Desktop */}
                <div className="hidden md:flex flex-col items-end gap-3 ml-8">
                  {/* Decorative Dots */}
                  <div className="flex gap-2 mr-2">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    <span className="w-3 h-3 bg-[#E3B214] rounded-full"></span>
                  </div>
                  
                  {/* Button Desktop */}
                  <Link href="/fanwork">
                    <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap active:scale-95">
                      Lihat Fanwork
                    </button>
                  </Link>
                </div>

                {/* Button Mobile/Tablet */}
                <div className="md:hidden w-full max-w-sm">
                  <Link href="/fanwork">
                    <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg w-full active:scale-95">
                      Lihat Fanwork
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Maskot Circle - Positioned Outside - Hidden on Mobile */}
            <div className="hidden sm:block absolute -left-4 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                {/* Outer green border */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[#66AC6E] p-1.5 sm:p-2 shadow-2xl">
                  {/* Yellow border */}
                  <div className="w-full h-full rounded-full border-4 sm:border-8 border-[#E3B214] bg-white flex items-center justify-center">
                    <span className="text-gray-400 text-xs sm:text-sm">Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pb-12 sm:pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 text-center border-2 border-gray-100">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-[#66AC6E]">
              Apa yang Bisa <span className="text-[#66AC6E]">Kamu</span>{" "}
              <span className="text-yellow-500">Lakukan?</span>
            </h2>
            
            <p className="text-[#66AC6E] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang untuk menjaga kebersihan lingkungan dan memberi dampak nyata di sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E] hover:bg-green-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap active:scale-95 w-full sm:w-auto">
                  Zero Waste Lifestyle
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E] hover:bg-green-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap active:scale-95 w-full sm:w-auto">
                  Recycle Bay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}