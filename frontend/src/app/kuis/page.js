"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  ArrowRight,
  Share2,
  Check,
  Lock,
  LogIn,
  UserPlus,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const quizQuestions = [
  {
    id: 1,
    question: "Jenis sampah yang memerlukan waktu paling lama (sekitar 400 - 500 tahun) untuk dapat terurai secara alami di alam adalah...",
    options: [
      "Sampah organik sisa makanan",
      "Sampah daun gugur dan ranting",
      "Sampah botol dan kantong plastik",
      "Kertas koran bekas"
    ],
    correctAnswer: 2, // Index 2: Sampah botol dan kantong plastik
    explanation: "Plastik tersusun dari rantai polimer sintetis kimia yang sangat kuat dan tidak dapat dicerna oleh mikroorganisme pengurai tanah, sehingga membutuhkan waktu hingga ratusan tahun untuk terurai."
  },
  {
    id: 2,
    question: "Dalam prinsip pengelolaan lingkungan modern, apa kepanjangan dari konsep '5R'?",
    options: [
      "Refuse, Reduce, Reuse, Recycle, Rot",
      "Remove, Return, Repair, Recycle, Replace",
      "Read, React, Reduce, Rebuild, Restore",
      "Refill, Regulate, Reuse, Reorganize, Rot"
    ],
    correctAnswer: 0,
    explanation: "5R merupakan prinsip gaya hidup berkelanjutan: Refuse (Menolak), Reduce (Mengurangi), Reuse (Menggunakan kembali), Recycle (Mendaur ulang), dan Rot (Mengompos)."
  },
  {
    id: 3,
    question: "Sisa kulit buah, sayuran busuk, dan daun-daun kering termasuk ke dalam kelompok sampah...",
    options: [
      "Sampah Anorganik",
      "Sampah Organik",
      "Sampah B3 (Bahan Berbahaya dan Beracun)",
      "Sampah Residu Industri"
    ],
    correctAnswer: 1,
    explanation: "Sampah organik adalah materi yang berasal dari makhluk hidup (tumbuhan dan hewan) dan dapat mengalami pembusukan secara alami oleh bakteri pengurai."
  },
  {
    id: 4,
    question: "Manakah tindakan di bawah ini yang merupakan contoh nyata dari penerapan prinsip 'Refuse' (menolak)?",
    options: [
      "Mengumpulkan kantong kresek di rumah untuk dibakar",
      "Menolak kantong plastik saat berbelanja dengan membawa totebag kain sendiri",
      "Membeli minuman kemasan botol plastik setiap kali haus",
      "Mengubur sampah plastik di pekarangan belakang rumah"
    ],
    correctAnswer: 1,
    explanation: "Refuse berarti mencegah timbulnya sampah dengan cara menolak barang sekali pakai yang tidak perlu sebelum barang tersebut menjadi beban bagi lingkungan."
  },
  {
    id: 5,
    question: "Apa akibat utama yang terjadi jika masyarakat membuang sampah sembarangan ke selokan atau sungai?",
    options: [
      "Sungai menjadi lebih jernih dan berarus tenang",
      "Menyumbat saluran air, memicu bencana banjir, dan merusak ekosistem perairan",
      "Ikan dan biota sungai mendapat asupan nutrisi tambahan",
      "Membantu menurunkan suhu udara di sekitar sungai"
    ],
    correctAnswer: 1,
    explanation: "Sampah yang menumpuk di saluran air menyebabkan pendangkalan, menyumbat aliran saat hujan deras sehingga memicu banjir, serta melepaskan partikel racun dan mikroplastik ke laut."
  },
  {
    id: 6,
    question: "Baterai bekas, botol racun serangga, dan jarum suntik bekas dikelompokkan ke dalam jenis sampah...",
    options: [
      "Sampah Organik Basah",
      "Sampah Anorganik Bernilai Tinggi",
      "Sampah B3 (Bahan Berbahaya dan Beracun)",
      "Sampah Kompos Alami"
    ],
    correctAnswer: 2,
    explanation: "Sampah B3 mengandung zat beracun, korosif, mudah terbakar, atau infeksius yang memerlukan penanganan khusus agar tidak meracuni air tanah dan kesehatan warga."
  },
  {
    id: 7,
    question: "Proses biologis pengolahan sampah organik menjadi pupuk alami yang kaya nutrisi bagi kesuburan tanah disebut...",
    options: [
      "Reboisasi",
      "Pengomposan (Composting)",
      "Eutrofikasi",
      "Pasteurisasi"
    ],
    correctAnswer: 1,
    explanation: "Pengomposan adalah proses penguraian bahan organik oleh mikroorganisme menjadi kompos, mengembalikan nutrisi penting ke dalam tanah tanpa pupuk kimia berbahaya."
  },
  {
    id: 8,
    question: "Mengapa kebiasaan membakar tumpukan sampah di pekarangan sangat berbahaya bagi kesehatan dan lingkungan?",
    options: [
      "Karena nyala apinya dapat mengurangi cadangan oksigen di atmosfer bumi",
      "Karena menghasilkan asap beracun (seperti dioksin & karbon monoksida) yang memicu penyakit pernapasan dan polusi udara",
      "Karena abu sisa pembakaran sampah dapat merusak aspal jalanan",
      "Karena membakar sampah membuat tanah di sekitarnya menjadi terlalu dingin"
    ],
    correctAnswer: 1,
    explanation: "Pembakaran sampah terbuka menghasilkan gas berbahaya seperti dioksin dan furan yang karsinogenik (pemicu kanker), serta memperparah emisi gas rumah kaca."
  },
  {
    id: 9,
    question: "Apa fungsi utama dan manfaat keberadaan Bank Sampah di lingkungan masyarakat?",
    options: [
      "Menimbun sampah sebanyak mungkin agar tidak terlihat oleh warga lain",
      "Mengumpulkan, memilah sampah anorganik bernilai ekonomis, dan mengedukasi warga menabung melalui sampah",
      "Menjual makanan dan minuman kemasan cepat saji untuk warga",
      "Membakar sampah kering secara massal setiap akhir pekan"
    ],
    correctAnswer: 1,
    explanation: "Bank Sampah mengajak masyarakat memilah sampah anorganik yang dapat didaur ulang, menukarnya dengan nilai tabungan uang, sekaligus mengurangi volume sampah yang dibawa ke TPA."
  },
  {
    id: 10,
    question: "Berapa lama rata-rata waktu yang dibutuhkan kertas biasa untuk terurai sempurna di tanah terbuka?",
    options: [
      "Sekitar 2 sampai 6 minggu",
      "Sekitar 50 sampai 100 tahun",
      "Sekitar 500 tahun",
      "Kertas tidak dapat terurai selamanya"
    ],
    correctAnswer: 0,
    explanation: "Kertas berbahan dasar serat selulosa pohon alami yang mudah dicerna dan diuraikan oleh mikroorganisme tanah dalam waktu singkat (2-6 minggu) jika terkena kelembapan dan tanah."
  },
  {
    id: 11,
    question: "Manakah tindakan berikut ini yang mencerminkan penerapan prinsip 'Reuse' (menggunakan kembali)?",
    options: [
      "Memanfaatkan kaleng biskuit bekas menjadi wadah alat tulis atau benang jahit",
      "Membakar botol plastik agar tidak menumpuk di dapur",
      "Langsung membuang baju yang kekecilan ke tempat sampah",
      "Selalu meminta kantong plastik baru di kasir supermarket"
    ],
    correctAnswer: 0,
    explanation: "Reuse berfokus pada penggunaan kembali wadah atau produk bekas untuk tujuan yang sama atau fungsi baru tanpa melalui peleburan pabrik ulang."
  },
  {
    id: 12,
    question: "Apa definisi utama dari gaya hidup 'Zero Waste Lifestyle'?",
    options: [
      "Gaya hidup membuang semua sampah langsung ke laut",
      "Upaya sadar meminimalkan timbulan sampah agar seminimal mungkin tidak ada yang berakhir di TPA",
      "Larangan total untuk makan dan minum produk olahan",
      "Membakar seluruh perlengkapan rumah tangga yang sudah tua"
    ],
    correctAnswer: 1,
    explanation: "Zero Waste adalah filosofi hidup yang mendorong siklus hidup produk yang berkelanjutan, meminimalkan limbah dengan cara menolak, mengurangi, memakai ulang, mendaur ulang, dan mengompos."
  },
  {
    id: 13,
    question: "Cairan berbahaya hasil pembusukan sampah yang bercampur air hujan dan dapat mencemari air tanah disebut...",
    options: [
      "Air mineral",
      "Air Lindi (Leachate)",
      "Air embun pagi",
      "Air suling murni"
    ],
    correctAnswer: 1,
    explanation: "Air lindi (leachate) adalah cairan pekat beracun dari tumpukan sampah yang membusuk, mengandung logam berat dan mikroba patogen yang dapat meresap ke sumur warga jika TPA tidak memiliki filter geomembran."
  },
  {
    id: 14,
    question: "Apa kepanjangan dari akronim 'TPA' dalam sistem tata kelola sampah di Indonesia?",
    options: [
      "Tempat Pemrosesan Akhir",
      "Tempat Pembakaran Alami",
      "Taman Pembelajaran Alam",
      "Terminal Pengangkutan Armada"
    ],
    correctAnswer: 0,
    explanation: "TPA secara resmi berarti Tempat Pemrosesan Akhir (sebelumnya sering disebut Tempat Pembuangan Akhir), tempat di mana residu sampah dikarantina dan diolah dengan sistem sanitasi."
  },
  {
    id: 15,
    question: "Langkah awal paling mendasar dan berdampak besar yang dapat dilakukan setiap individu dari rumah adalah...",
    options: [
      "Menunggu petugas kebersihan datang setiap hari tanpa berbuat apa-apa",
      "Memilah sampah dari rumah (organik vs anorganik) serta mengurangi pemakaian produk sekali pakai",
      "Membuang sampah ke pekarangan rumah tetangga",
      "Mengubur semua sampah baterai dan kaleng di bawah pot bunga"
    ],
    correctAnswer: 1,
    explanation: "Memilah sampah sejak dari sumbernya (rumah tangga) adalah kunci utama keberhasilan daur ulang dan pengomposan, mencegah sampah menjadi kotor dan bercampur baur."
  }
];

export default function KuisPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewFilter, setReviewFilter] = useState("all"); // 'all', 'correct', 'incorrect'
  const [copied, setCopied] = useState(false);

  // Periksa apakah user sudah login sebelum mengerjakan kuis
  useEffect(() => {
    let isMounted = true;
    let unsubFirebase = null;

    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 200) {
          if (!isMounted) return;
          setIsLoggedIn(true);
          const userRes = await fetch("/api/user/me", {
            credentials: "include",
            cache: "no-store",
          });
          if (userRes.ok) {
            const data = await userRes.json();
            if (isMounted) setUserProfile(data);
          }
          if (isMounted) setIsLoadingAuth(false);
          return;
        }
      } catch (err) {
        console.warn("API auth check error:", err);
      }

      // Cek Firebase client auth jika session cookie belum ada
      if (auth) {
        unsubFirebase = onAuthStateChanged(auth, (u) => {
          if (!isMounted) return;
          if (u) {
            setIsLoggedIn(true);
            setUserProfile({
              name: u.displayName || u.email?.split("@")[0] || "Sobat Bumi",
              email: u.email,
              avatar: u.photoURL,
            });
          } else {
            setIsLoggedIn(false);
            setUserProfile(null);
          }
          setIsLoadingAuth(false);
        });
      } else {
        if (isMounted) {
          setIsLoggedIn(false);
          setIsLoadingAuth(false);
        }
      }
    };

    checkLoginStatus();

    return () => {
      isMounted = false;
      if (unsubFirebase) unsubFirebase();
    };
  }, []);

  // Restore saved quiz attempt from localStorage on mount (if available)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bumi_bersih_quiz_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedAnswers) setSelectedAnswers(parsed.selectedAnswers);
        if (parsed.isSubmitted) {
          setIsSubmitted(true);
          setScore(parsed.score || 0);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelect = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    // Scale 0 - 100 rounded
    const finalScore = Math.round((correctCount / quizQuestions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    try {
      localStorage.setItem(
        "bumi_bersih_quiz_state",
        JSON.stringify({
          selectedAnswers,
          isSubmitted: true,
          score: finalScore,
          date: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.error(e);
    }

    // Smooth scroll to top of score section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCurrentIdx(0);
    setReviewFilter("all");
    try {
      localStorage.removeItem("bumi_bersih_quiz_state");
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    const text = `Saya baru saja menyelesaikan Kuis Kebersihan Lingkungan di Bumi Bersih dengan skor ${score}/100! 🌍 Yuk uji pengetahuan peduli lingkunganmu juga!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      alert(text);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQ = quizQuestions[currentIdx];

  // Review statistics
  const correctTotal = quizQuestions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctAnswer
  ).length;
  const incorrectTotal = quizQuestions.length - correctTotal;

  // Filter questions for the answer key review
  const filteredQuestions = quizQuestions.filter((q, idx) => {
    const isCorrect = selectedAnswers[idx] === q.correctAnswer;
    if (reviewFilter === "correct") return isCorrect;
    if (reviewFilter === "incorrect") return !isCorrect;
    return true;
  });

  const getScoreBadge = () => {
    if (score === 100) {
      return {
        title: "Pahlawan Bumi Sejati! 🌟",
        desc: "Luar biasa sempurna! Kamu memiliki pemahaman yang sangat mendalam tentang kebersihan lingkungan dan kelestarian bumi.",
        color: "text-emerald-700 bg-emerald-50 border-emerald-300",
      };
    }
    if (score >= 80) {
      return {
        title: "Sobat Lestari Hebat! 🌿",
        desc: "Keren sekali! Pengetahuanmu tentang pengelolaan sampah dan lingkungan sangat baik. Terus sebarkan aksi positif ini!",
        color: "text-green-700 bg-green-50 border-green-300",
      };
    }
    if (score >= 60) {
      return {
        title: "Pemerhati Lingkungan Baik! 🌱",
        desc: "Bagus! Kamu sudah memahami dasar-dasar kebersihan lingkungan. Pelajari kunci jawaban di bawah untuk memperdalam pemahamanmu.",
        color: "text-yellow-700 bg-yellow-50 border-yellow-300",
      };
    }
    return {
      title: "Semangat Terus Belajar! 🌏",
      desc: "Jangan berkecil hati! Ini adalah kesempatan emas untuk belajar. Periksa kunci jawaban dan penjelasan di bawah untuk jadi sobat bumi yang lebih bijak.",
      color: "text-amber-700 bg-amber-50 border-amber-300",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="text-center mb-8 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#66AC6E]/10 text-[#66AC6E] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles size={16} /> Uji Wawasan Peduli Lingkungan
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Kuis Kebersihan <span className="text-[#66AC6E]">Bumi Bersih</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Jawab 15 soal seputar pemilahan sampah, prinsip 5R, pengomposan, dan pelestarian bumi.
            Nilai serta kunci jawaban lengkap akan langsung ditampilkan setelah kamu menyelesaikannya!
          </p>
        </div>

        {/* ===================== AUTH LOADING & GATEKEEPER ===================== */}
        {isLoadingAuth ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-md text-center max-w-md mx-auto my-12">
            <Loader2 className="w-10 h-10 text-[#66AC6E] animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium text-sm">Memeriksa status akun...</p>
          </div>
        ) : !isLoggedIn ? (
          /* GATEKEEPER: LOGIN REQUIRED */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 max-w-2xl mx-auto text-center my-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-[#66AC6E] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-100">
              <Lock size={36} />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-amber-200">
              <ShieldCheck size={14} /> Wajib Masuk Akun
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
              Login untuk Mengerjakan Kuis
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              Untuk dapat mengerjakan <strong>15 Soal Kuis Lingkungan</strong>, mendapatkan skor penilaian otomatis, serta membuka kunci jawaban lengkap, kamu perlu masuk ke akun terlebih dahulu.
            </p>

            {/* Benefit Box */}
            <div className="bg-green-50/70 border border-green-100 rounded-2xl p-4 sm:p-5 mb-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#66AC6E] font-bold text-sm">
                  15
                </div>
                <div className="text-xs text-gray-700 font-medium">
                  Soal Edukasi Lingkungan
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#E3B214] font-bold text-sm">
                  ★
                </div>
                <div className="text-xs text-gray-700 font-medium">
                  Skor & Lencana Prestasi
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 font-bold text-sm">
                  ✓
                </div>
                <div className="text-xs text-gray-700 font-medium">
                  Kunci Jawaban & Pembahasan
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/sign-in"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#66AC6E] hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition hover:scale-105 active:scale-95"
              >
                <LogIn size={18} /> Sign In Sekarang
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E3B214] hover:bg-yellow-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition hover:scale-105 active:scale-95"
              >
                <UserPlus size={18} /> Belum Punya Akun? Daftar
              </Link>
            </div>
          </div>
        ) : isSubmitted ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#66AC6E] to-[#4e8d55] px-6 py-8 sm:p-10 text-white text-center relative">
                <div className="absolute top-4 right-4">
                  <Award size={48} className="opacity-20" />
                </div>
                <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-90">
                  Hasil Kuis Kebersihan Lingkungan
                </span>

                <div className="my-4 flex items-baseline justify-center gap-2">
                  <span className="text-6xl sm:text-7xl font-extrabold tracking-tight">
                    {score}
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold opacity-80">/100</span>
                </div>

                <div className="inline-block px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-sm text-sm sm:text-base font-bold">
                  {getScoreBadge().title}
                </div>
                <p className="mt-3 text-xs sm:text-sm max-w-lg mx-auto opacity-95 text-white/90">
                  {getScoreBadge().desc}
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 max-w-md mx-auto text-gray-800">
                  <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                    <span className="block text-xl sm:text-2xl font-bold text-gray-800">
                      15
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium">Total Soal</span>
                  </div>
                  <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                    <span className="block text-xl sm:text-2xl font-bold text-emerald-600">
                      {correctTotal}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium">Benar</span>
                  </div>
                  <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                    <span className="block text-xl sm:text-2xl font-bold text-rose-500">
                      {incorrectTotal}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium">Salah</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 bg-gray-50 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-[#66AC6E] hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition shadow-md hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  <RotateCcw size={18} /> Ulangi Kuis
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 px-5 py-3 rounded-full font-semibold transition text-sm shadow-sm"
                  >
                    {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                    {copied ? "Tersalin!" : "Salin Skor"}
                  </button>
                  <Link
                    href="/recycle-craft"
                    className="flex items-center gap-1.5 text-[#66AC6E] hover:text-green-800 font-semibold text-sm px-3 py-2"
                  >
                    Recycle Craft <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Answer Key & Explanation Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-[#66AC6E] font-bold text-lg sm:text-xl">
                    <BookOpen size={22} /> Kunci Jawaban & Pembahasan Lengkap
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Pelajari setiap nomor untuk menambah wawasan kebersihan lingkunganmu
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs sm:text-sm">
                  <button
                    onClick={() => setReviewFilter("all")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                      reviewFilter === "all" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Semua ({quizQuestions.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter("correct")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                      reviewFilter === "correct" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-emerald-700"
                    }`}
                  >
                    Benar ({correctTotal})
                  </button>
                  <button
                    onClick={() => setReviewFilter("incorrect")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                      reviewFilter === "incorrect" ? "bg-white text-rose-700 shadow-sm" : "text-gray-500 hover:text-rose-700"
                    }`}
                  >
                    Salah ({incorrectTotal})
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="divide-y divide-gray-100 mt-4">
                {filteredQuestions.map((q) => {
                  const originalIdx = q.id - 1;
                  const userAnswerIdx = selectedAnswers[originalIdx];
                  const isCorrect = userAnswerIdx === q.correctAnswer;
                  const hasAnswered = userAnswerIdx !== undefined;

                  return (
                    <div key={q.id} className="py-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {q.id}
                          </span>
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-relaxed">
                            {q.question}
                          </h3>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                            isCorrect
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={14} /> Benar
                            </>
                          ) : (
                            <>
                              <XCircle size={14} /> Salah
                            </>
                          )}
                        </span>
                      </div>

                      {/* Options breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-10">
                        {q.options.map((opt, optIdx) => {
                          const isOptionCorrect = optIdx === q.correctAnswer;
                          const isOptionUser = optIdx === userAnswerIdx;

                          let badgeClass = "border-gray-200 bg-gray-50 text-gray-700";
                          if (isOptionCorrect) {
                            badgeClass = "border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-400";
                          } else if (isOptionUser && !isOptionCorrect) {
                            badgeClass = "border-rose-400 bg-rose-50 text-rose-900 line-through opacity-80";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2 ${badgeClass}`}
                            >
                              <span className="font-bold uppercase w-5">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isOptionCorrect && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                  Kunci Jawaban
                                </span>
                              )}
                              {isOptionUser && !isOptionCorrect && (
                                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                  Jawaban Kamu
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      <div className="ml-10 bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-gray-700">
                        <span className="font-bold text-amber-900 block mb-1">
                          💡 Pembahasan:
                        </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom replay */}
              <div className="pt-6 border-t border-gray-100 text-center">
                <button
                  onClick={handleReset}
                  className="bg-[#66AC6E] hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition shadow-md hover:scale-105"
                >
                  Coba Kuis Lagi
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ===================== QUIZ IN PROGRESS VIEW ===================== */
          <div className="space-y-6">
            {/* User Login Indicator Bar */}
            <div className="bg-white border border-green-100 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#66AC6E] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {userProfile?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">Sedang mengerjakan kuis sebagai</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    {userProfile?.name || "Sobat Bumi"}
                  </p>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
                ✓ Akun Aktif
              </span>
            </div>

            {/* Progress & Quick Nav */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
              <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                <span className="font-semibold text-gray-600">
                  Soal <strong className="text-[#66AC6E]">{currentIdx + 1}</strong> dari {quizQuestions.length}
                </span>
                <span className="font-semibold text-gray-600">
                  Terjawab: <strong className="text-[#66AC6E]">{answeredCount}</strong>/{quizQuestions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#66AC6E] to-[#E3B214] transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* 15 Question Navigation Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 justify-center">
                {quizQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs transition flex items-center justify-center ${
                        isCurrent
                          ? "bg-[#66AC6E] text-white shadow-md ring-2 ring-[#66AC6E] ring-offset-2 scale-105"
                          : isAnswered
                          ? "bg-emerald-100 text-[#66AC6E] hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      title={`Soal ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#66AC6E] text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Nomor {currentIdx + 1}
                </span>
                <span className="text-xs text-gray-400 font-medium">Pilihlah salah satu jawaban yang paling tepat</span>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-snug mb-6">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-3 sm:gap-4 ${
                        isSelected
                          ? "border-[#66AC6E] bg-green-50/70 text-gray-900 shadow-md scale-[1.01]"
                          : "border-gray-200 hover:border-green-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 transition ${
                          isSelected
                            ? "bg-[#66AC6E] text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-green-100"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm sm:text-base font-medium flex-1">
                        {option}
                      </span>
                      {isSelected && (
                        <CheckCircle2 size={20} className="text-[#66AC6E] flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold text-xs sm:text-sm hover:bg-gray-100 transition disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={16} /> Sebelumnya
                </button>

                {currentIdx < quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((p) => Math.min(quizQuestions.length - 1, p + 1))}
                    className="flex items-center gap-1.5 bg-[#66AC6E] hover:bg-green-700 text-white px-5 sm:px-7 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition shadow-md hover:scale-105"
                  >
                    Selanjutnya <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (answeredCount < quizQuestions.length) {
                        const confirm = window.confirm(
                          `Kamu baru menjawab ${answeredCount} dari ${quizQuestions.length} soal. Yakin ingin mengumpulkan sekarang?`
                        );
                        if (!confirm) return;
                      }
                      calculateScore();
                    }}
                    className="flex items-center gap-1.5 bg-[#E3B214] hover:bg-yellow-500 text-white px-6 sm:px-8 py-2.5 rounded-full font-bold text-xs sm:text-sm transition shadow-lg hover:scale-105"
                  >
                    Kumpulkan Jawaban <Sparkles size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Submit banner if all answered */}
            {answeredCount === quizQuestions.length && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                  Semua 15 soal telah dijawab! Siap melihat nilai dan kunci jawabannya?
                </div>
                <button
                  onClick={calculateScore}
                  className="bg-[#66AC6E] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md whitespace-nowrap"
                >
                  Kumpulkan & Lihat Hasil
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
