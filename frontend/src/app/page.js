"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BumiBersihApp() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section 1 */}
      <section id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="order-2 md:order-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              <span className="text-[#E3B214]">Menjadi Bersih Dimulai dari Diri Sendiri.</span>
              <br />
              <span className="text-[#66AC6E]">Mari Lestari</span>
              <span className="text-[#66AC6E]">kan Bumi Pertiwi!</span> 
            </h1>

            <p className="text-[#66AC6E] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Perubahan dimulai dari tindakan kecil. Dengan memilah sampah, mengurangi plastik sekali pakai, dan menjaga kebersihan sekitar,
              setiap individu dapat berkontribusi menciptakan lingkungan yang lebih sehat. 
              Temukan solusi sederhana yang bisa kamu lakukan mulai hari ini
            </p>
          </div>

          {/* Right Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/Home Page 11.png"
                  fill
                  alt="Bumi Bersih Illustration"
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-[#66AC6E] via-[#66AC6E] to-[#66AC6E]"></div>
      </div>

      {/* Section 2 - Image Left, Text Right */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          <div className="order-1 md:order-1 flex justify-center">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/Home Page 22.png"
                  fill
                  alt="Membuang Sampah"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              <span className="text-[#E3B214]">Kenapa Kamu</span> 
              <br />
              <span className="text-[#66AC6E]">Harus Peduli?</span> 
            </h1>

            <p className="text-[#66AC6E] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Indonesia menghasilkan 194.002 ton sampah setiap hari, dan sebagian besar masih dibuang sembarangan. 
              Komposisinya didominasi 60% sampah organik yang bercampur dengan anorganik seperti plastik, kertas, logam, dan 
              kaca campuran yang bikin pengelolaan makin sulit dan mahal. 
              Jumlah sampah terus naik 3% per tahun, sementara hanya sebagian kecil yang berhasil didaur ulang atau dikelola lewat bank sampah.
              Akibatnya, tumpukan sampah menumpuk di kota besar, menyumbat sungai, dan memperburuk sanitasi.
            </p>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-[#66AC6E] via-[#66AC6E] to-[#66AC6E]"></div>
      </div>

      {/* Section 3 - Text Left, Image Right - FIXED */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24 lg:gap-32 items-center">
          
          <div className="order-2 md:order-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              <span className="text-[#E3B214]">Apa Dampak </span> 
              <br />
              <span className="text-[#66AC6E]">Isu Kebersihan Lingkungan?</span>
            </h1>

            <p className="text-[#66AC6E] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Upaya daur ulang dan pengelolaan melalui bank sampah masih sangat terbatas. 
              Sebagian besar sampah yang bisa didaur ulang tetap berakhir di tempat pembuangan atau dibakar, 
              sehingga potensi pemulihan sumber daya menjadi hilang. Penanganan yang tidak optimal ini juga menimbulkan biaya lingkungan dan sosial yang besar, 
              termasuk kerusakan ekosistem, penurunan kualitas air, dan meningkatnya risiko bencana akibat banjir dan longsor.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:ml-8 lg:ml-16">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/Home Page 33.png"
                  fill
                  alt="Mengurangi Sampah"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-[#66AC6E] via-[#66AC6E] to-[#66AC6E]"></div>
      </div>

      {/* Section 4 - Image Left, Text Right - FIXED */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24 lg:gap-32 items-center">
          
          <div className="order-1 md:order-1 flex justify-center md:mr-8 lg:mr-16">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/homepage5.png"
                  fill
                  alt="Daur Ulang"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              <span className="text-[#E3B214]">Jangan Anggap</span>
              <br />
              <span className="text-[#66AC6E]">Remeh Isu Kebersihan!</span> 
            </h1>

            <p className="text-[#66AC6E] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Dampaknya nggak main-main: gas rumah kaca dari sampah organik, plastik yang lama terurai, 
              banjir akibat saluran tersumbat, hingga risiko penyakit yang meningkat. Potensi daur ulang pun hilang karena pengelolaan yang tidak optimal. 
              Di Bumi Bersih, kamu bisa belajar memilah, memahami proses daur ulang, dan ikut mendukung gerakan lewat fanwork tentang maskot Bumi Bersih, 
              sekaligus menemukan inspirasi untuk langkah-langkah kecil yang bisa kamu mulai hari ini.
            </p>
          </div>

        </div>
      </section>

      {/* Maskot Section - IMPROVED WITH LARGER IMAGE */}
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

            {/* Maskot Image - LARGER SIZE - Hidden on mobile */}
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

      {/* Call to Action */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#66AC6E] mb-4 sm:mb-6">
              Apa yang Bisa <span className="text-yellow-500">Kamu</span>{" "}
              <span className="text-[#66AC6E]">Lakukan?</span>
            </h2>

            <p className="text-[#66AC6E] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang
              untuk menjaga kebersihan lingkungan dan memberi dampak nyata di sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/what-to-do">
                <button className="bg-[#66AC6E] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  What To Do
                </button>
              </Link>
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Zero Waste Lifestyle
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
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