"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ZeroWasteLifestyle() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION 1 */}
      <section id="zero-waste-lifestyle" className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#66AC6E] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Zero <span className="text-[#E3B214]">Waste</span> Lifestyle
              </h1>
              <div className="flex items-end space-x-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
                <span className="w-4 h-4 bg-[#E3B214] rounded-full"></span>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-4">
              Setelah mengenal berbagai langkah menjaga kebersihan lingkungan,
              saatnya kita melangkah lebih jauh dengan menerapkan gaya hidup
              yang berkelanjutan. Gaya hidup zero waste bukan sekadar tren,
              tetapi cara berpikir dan bertindak untuk mengurangi sampah hingga
              seminimal mungkin.
            </p>

            <p className="text-lg leading-relaxed mb-4">
              Konsep ini mengajak kita untuk menggunakan kembali barang,
              memperbaiki, dan memilih produk yang ramah lingkungan agar bumi
              tetap lestari.
            </p>

            <p className="text-lg leading-relaxed font-bold mb-2">
              Apa Itu Zero Waste?
            </p>

            <p className="text-lg leading-relaxed">
              Zero waste berarti berusaha agar tidak ada limbah yang berakhir di
              tempat pembuangan akhir. Prinsip utamanya dikenal dengan 5R,
              yaitu:
            </p>
          </div>
        </div>
      </section>

      {/* HERO SECTION 2 — 5R Principles */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Refuse */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#66AC6E] leading-none flex-shrink-0">
                1
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/images/Refuse.png"
                    alt="Refuse - Menolak"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  <span className="text-[#E3B214]">Refuse</span>{" "}
                  <span className="text-[#66AC6E]">(Menolak)</span>
                </h3>
                <p className="text-[#66AC6E] leading-relaxed text-sm md:text-base">
                  Hindari penggunaan barang-barang sekali pakai seperti sedotan
                  plastik, kantong kresek, atau gelas styrofoam.
                </p>
              </div>
            </div>

            {/* 2. Reduce */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#66AC6E] leading-none flex-shrink-0">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/images/Reduce.png"
                    alt="Reduce - Mengurangi"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  <span className="text-[#E3B214]">Reduce</span>{" "}
                  <span className="text-[#66AC6E]">(Mengurangi)</span>
                </h3>
                <p className="text-[#66AC6E] leading-relaxed text-sm md:text-base">
                  Kurangi konsumsi berlebihan dengan membeli barang seperlunya
                  saja.
                </p>
              </div>
            </div>

            {/* 3. Reuse */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#66AC6E] leading-none flex-shrink-0">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/images/reuse.png"
                    alt="Reuse - Pakai Kembali"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  <span className="text-[#E3B214]">Reuse</span>{" "}
                  <span className="text-[#66AC6E]">(Pakai Kembali)</span>
                </h3>
                <p className="text-[#66AC6E] leading-relaxed text-sm md:text-base">
                  Gunakan ulang wadah, botik kaca, atau plastik agar tidak cepat
                  menjadi sampah.
                </p>
              </div>
            </div>

            {/* 4. Recycle */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#66AC6E] leading-none flex-shrink-0">
                4
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/images/recyclee.png"
                    alt="Recycle - Daur Ulang"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  <span className="text-[#E3B214]">Recycle</span>{" "}
                  <span className="text-[#66AC6E]">(Daur Ulang)</span>
                </h3>
                <p className="text-[#66AC6E] leading-relaxed text-sm md:text-base">
                  Pisahkan sampah yang bisa didaur ulang dan daur ulang jadi
                  barang berguna.
                </p>
              </div>
            </div>

            {/* 5. Rot */}
            <div className="md:col-span-2 flex gap-4 md:gap-6 max-w-3xl mx-auto w-full">
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#66AC6E] leading-none flex-shrink-0">
                5
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/images/Rot.png"
                    alt="Rot - Mengompos"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  <span className="text-[#E3B214]">Rot</span>{" "}
                  <span className="text-[#66AC6E]">(Mengompos)</span>
                </h3>
                <p className="text-[#66AC6E] leading-relaxed text-sm md:text-base">
                  Manfaatkan sisa makanan atau bahan organik menjadi kompos untuk menyuburkan tanaman di rumah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maskot Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-[#66AC6E] rounded-3xl sm:rounded-[50px] shadow-2xl overflow-visible ml-0 sm:ml-20 md:ml-40">
              <div className="flex flex-col md:flex-row items-center py-6 sm:py-8 md:py-12 pl-6 sm:pl-8 md:pl-48 pr-6 sm:pr-8 md:pr-12 gap-4 md:gap-0">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
                    Menyukai <span className="text-[#E3B214]">Maskot</span> Kami?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto md:mx-0">
                    Kunjungi halaman fanwork kami untuk melihat hasil karya sobat Bumi Bersih lainnya,
                    atau ikut serta mengupload karyamu dan bantu sebarkan kesadaran isu lingkungan.
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

                <div className="md:hidden w-full max-w-sm">
                  <Link href="/fanwork">
                    <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-8 py-3 rounded-full font-bold w-full transition-all duration-300 hover:scale-105 shadow-lg active:scale-95">
                      Lihat Fanwork
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Maskot Image */}
            <div className="hidden sm:block absolute -left-8 sm:-left-10 md:-left-12 top-1/2 -translate-y-1/2 z-10">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-[#66AC6E] p-2 sm:p-2.5 shadow-2xl">
                <div className="relative w-full h-full rounded-full border-4 sm:border-6 md:border-8 border-[#E3B214] bg-white overflow-hidden">
                  <Image
                    src="/images/Maskot.png"
                    fill
                    alt="Maskot Bumi Bersih"
                    className="object-cover scale-137"
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 420px"
                  />
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