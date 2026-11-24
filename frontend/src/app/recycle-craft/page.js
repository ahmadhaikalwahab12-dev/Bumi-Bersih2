"use client";

import React, { useState, useEffect, useMemo } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Upload,
  X,
  Send,
  Loader2,
  Download,
  Maximize2,
  Search,
  Sparkles,
  Check,
  Tag,
  AlertCircle,
  Info,
} from "lucide-react";

// ==========================================
// CONTOH KARYA DAUR ULANG RESMI & OTENTIK
// (100% Sesuai Topik Kerajinan Daur Ulang)
// ==========================================
const DEFAULT_CRAFTS = [
  {
    id: "craft-1",
    isDefault: true,
    title: "Pot Gantung Estetik dari Botol Plastik Bekas",
    description:
      "Memanfaatkan botol plastik air mineral 1.5L yang dipotong dan dicat dengan karakter lucu, kemudian digantung menggunakan tali rami. Sangat cocok untuk tanaman hias sukulen atau sirih gading di teras rumah.",
    materials: "Botol air mineral bekas, tali rami, cat akrilik, gunting",
    category: "Plastik",
    imageUrl: "/images/crafts/pot_tanaman_botol.jpg",
    authorName: "Siti Lestari",
    authorPhoto: null,
    likes: ["user-demo-1", "user-demo-2", "user-demo-3", "user-demo-4", "user-demo-5"],
    comments: [
      {
        userName: "Budi Santoso",
        text: "Keren banget idenya! Teras rumah jadi kelihatan asri dan bebas sampah plastik.",
        createdAt: "2026-11-20T10:00:00.000Z",
      },
      {
        userName: "Rina Kartika",
        text: "Cat yang dipakai tahan air ga ya kalau kena siraman tanaman?",
        createdAt: "2026-11-20T14:30:00.000Z",
      },
    ],
    createdAt: "2026-11-20T08:00:00.000Z",
  },
  {
    id: "craft-2",
    isDefault: true,
    title: "Lampu Hias Meja dari Sendok Plastik & Botol",
    description:
      "Lampu tidur hangat berbentuk kelopak bunga krisan yang dirangkai dari susunan kepala sendok plastik bekas acara keluarga. Menggunakan bohlam lampu LED hemat energi yang tidak mudah panas.",
    materials: "Sendok plastik bekas, botol kaca sirup, lem tembak, lampu LED",
    category: "Plastik",
    imageUrl: "/images/crafts/lampu_hias_recycled.jpg",
    authorName: "Ahmad Fauzi",
    authorPhoto: null,
    likes: ["user-demo-1", "user-demo-2", "user-demo-6", "user-demo-7"],
    comments: [
      {
        userName: "Dian Permata",
        text: "Hasil cahayanya estetik banget waktu malam hari! Sangat inspiratif.",
        createdAt: "2026-11-19T19:20:00.000Z",
      },
    ],
    createdAt: "2026-11-19T18:00:00.000Z",
  },
  {
    id: "craft-3",
    isDefault: true,
    title: "Desk Organizer Elegan dari Kaleng Susu Bekas",
    description:
      "Tempat alat tulis meja belajar yang dibuat dari kaleng susu kental manis bekas. Dililit menggunakan tali goni / rami natural dan dihiasi kain perca renda untuk sentuhan rustic modern.",
    materials: "Kaleng bekas susu, tali goni / rami, renda kain, lem serbaguna",
    category: "Kaleng",
    imageUrl: "/images/crafts/organizer_kaleng.jpg",
    authorName: "Rian Pratama",
    authorPhoto: null,
    likes: ["user-demo-2", "user-demo-8", "user-demo-9"],
    comments: [
      {
        userName: "Maya S",
        text: "Meja kerjaku jadi rapi dengan kaleng bekas ini, hemat biaya dan ramah lingkungan!",
        createdAt: "2026-11-18T11:15:00.000Z",
      },
    ],
    createdAt: "2026-11-18T10:00:00.000Z",
  },
  {
    id: "craft-4",
    isDefault: true,
    title: "Tote Bag Belanja Modis dari Kain Perca & Serat Daur Ulang",
    description:
      "Tas belanja pengganti kantong kresek sekali pakai yang dijahit dari sisa potongan kain perca konveksi. Memiliki jahitan dobel sehingga kuat menampung beban belanjaan hingga 10 kg.",
    materials: "Kain perca katun, benang jahit, tali webbing katun",
    category: "Kain",
    imageUrl: "/images/crafts/tas_belanja_eco.jpg",
    authorName: "Dewi Anggraini",
    authorPhoto: null,
    likes: ["user-demo-1", "user-demo-3", "user-demo-10", "user-demo-11", "user-demo-12"],
    comments: [
      {
        userName: "Hendra Wijaya",
        text: "Selalu saya bawa di motor buat belanja ke pasar. Bye-bye kantong kresek!",
        createdAt: "2026-11-17T16:40:00.000Z",
      },
    ],
    createdAt: "2026-11-17T15:00:00.000Z",
  },
  {
    id: "craft-5",
    isDefault: true,
    title: "Kotak Tisu & Wadah Penyimpanan dari Kardus Bekas Sepatu",
    description:
      "Kardus bekas sepatu yang diubah menjadi dispenser tisu gulung dan organizer laci pernak-pernik. Dilapisi kertas samson cokelat daur ulang serta diberi ornamen dedaunan kering.",
    materials: "Kardus sepatu bekas, kertas daur ulang, lem kertas, cutter",
    category: "Kardus",
    imageUrl: "/images/crafts/kotak_tisu_kardus.jpg",
    authorName: "Fajar Ramadhan",
    authorPhoto: null,
    likes: ["user-demo-4", "user-demo-13"],
    comments: [
      {
        userName: "Salma Nabila",
        text: "Bagus banget, kardus sepatu yang numpuk di rumah akhirnya ada gunanya!",
        createdAt: "2026-11-16T14:10:00.000Z",
      },
    ],
    createdAt: "2026-11-16T13:00:00.000Z",
  },
  {
    id: "craft-6",
    isDefault: true,
    title: "Mangkuk & Nampan Anyaman dari Kertas Koran Bekas",
    description:
      "Koran bekas yang digulung menjadi silinder pipih lalu dianyam spiral menjadi nampan saji buah atau wadah kunci rumah. Dilapisi pernis pelindung agar kaku dan tahan cipratan air.",
    materials: "Koran harian bekas, lidi penggulung, lem putih, pernis kayu",
    category: "Kertas",
    imageUrl: "/images/crafts/kerajinan_anyaman.jpg",
    authorName: "Maya Indah",
    authorPhoto: null,
    likes: ["user-demo-2", "user-demo-5", "user-demo-14", "user-demo-15"],
    comments: [
      {
        userName: "Doni Prasetyo",
        text: "Ga nyangka dari koran bekas bisa jadi nampan sekokoh dan secantik ini.",
        createdAt: "2026-11-15T09:25:00.000Z",
      },
    ],
    createdAt: "2026-11-15T08:00:00.000Z",
  },
  {
    id: "craft-7",
    isDefault: true,
    title: "Pot Tanaman Sukulen dari Botol Sabun & Deterjen",
    description:
      "Botol bekas sabun cair tebal yang dipotong miring dan dilubangi bagian bawahnya untuk drainase akar tanaman. Warnanya yang cerah memberi aksen segar di meja kerja.",
    materials: "Botol sabun/deterjen bekas, cutter, tanah kompos, tanaman sukulen",
    category: "Plastik",
    imageUrl: "/images/crafts/botol_pot.jpg",
    authorName: "Gita Savitri",
    authorPhoto: null,
    likes: ["user-demo-1", "user-demo-16", "user-demo-17"],
    comments: [
      {
        userName: "Arif Hidayat",
        text: "Plastik botol sabun biasanya awet bertahun-tahun, pas banget buat pot!",
        createdAt: "2026-11-14T17:05:00.000Z",
      },
    ],
    createdAt: "2026-11-14T16:00:00.000Z",
  },
];

// Filter out unrelated/old test images
function sanitizeCraftImage(url) {
  if (!url) return "/images/crafts/pot_tanaman_botol.jpg";
  if (
    url.includes("Home Page") ||
    url.includes("Fan page") ||
    url.includes("Fanwork.png") ||
    url.includes("WhatsApp") ||
    url.includes("img_plc")
  ) {
    return "/images/crafts/pot_tanaman_botol.jpg";
  }
  return url;
}

// Toast component
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm text-white transition-all ${type === "error" ? "bg-red-600" : type === "info" ? "bg-blue-600" : "bg-gray-900"}`}>
      {type === "error" ? <AlertCircle size={18} /> : type === "info" ? <Info size={18} /> : <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={12} /></div>}
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

export default function RecycleCraftPage() {
  const [user, setUser] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [posts, setPosts] = useState(DEFAULT_CRAFTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInputTexts, setCommentInputTexts] = useState({});
  const [guestNames, setGuestNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [zoomPost, setZoomPost] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }
  const [uploadError, setUploadError] = useState("");

  // Local likes tracking (works offline / without login)
  const [localLikedIds, setLocalLikedIds] = useState([]);

  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    materials: "",
    category: "Plastik",
    file: null,
    preview: null,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Check auth states
  useEffect(() => {
    let unsub = null;

    // Firebase auth listener (only if Firebase initialized)
    if (auth) {
      unsub = onAuthStateChanged(auth, (u) => setUser(u));
    }

    // Check session API (for email/password users - works without Firebase)
    fetch("/api/user/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.name) setSessionUser(data);
      })
      .catch(() => {});

    // Load local likes
    try {
      const savedLikes = localStorage.getItem("bumi_bersih_craft_likes");
      if (savedLikes) setLocalLikedIds(JSON.parse(savedLikes));
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Fetch Firestore posts and combine with curated crafts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let firestorePosts = [];
      if (db) {
        const q = query(
          collection(db, "recycle-crafts"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        firestorePosts = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          isDefault: false,
          imageUrl: sanitizeCraftImage(d.data().imageUrl),
        }));
      }

      // Check local storage for any guest uploads
      let localUploads = [];
      try {
        const savedCustomPosts = localStorage.getItem("bumi_bersih_local_crafts");
        if (savedCustomPosts) {
          localUploads = JSON.parse(savedCustomPosts);
        }
      } catch (e) {
        console.error(e);
      }

      // Check local comments overrides
      let localCommentsMap = {};
      try {
        const savedComments = localStorage.getItem("bumi_bersih_craft_comments");
        if (savedComments) localCommentsMap = JSON.parse(savedComments);
      } catch (e) {
        console.error(e);
      }

      // Combine: new uploads first, then default crafts
      const allPosts = [...localUploads, ...firestorePosts, ...DEFAULT_CRAFTS];

      // Deduplicate by ID
      const uniqueMap = new Map();
      allPosts.forEach((p) => {
        if (!uniqueMap.has(p.id)) {
          const mergedComments = [
            ...(p.comments || []),
            ...(localCommentsMap[p.id] || []),
          ];
          uniqueMap.set(p.id, { ...p, comments: mergedComments });
        }
      });

      setPosts(Array.from(uniqueMap.values()));
    } catch (err) {
      console.warn("Could not fetch remote posts, using local crafts:", err);
      setPosts(DEFAULT_CRAFTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadData((p) => ({
      ...p,
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadError("");
  };

  const handleUpload = async () => {
    setUploadError("");

    if (!uploadData.file || !uploadData.title.trim()) {
      setUploadError("Judul karya dan gambar wajib diisi!");
      return;
    }

    const currentUserName =
      user?.displayName ||
      sessionUser?.name ||
      user?.email?.split("@")[0] ||
      "Sobat Bumi";

    setIsUploading(true);
    try {
      let uploadedUrl = null;

      // Try uploading to backend /api/upload
      try {
        const form = new FormData();
        form.append("file", uploadData.file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (res.ok) {
          const data = await res.json();
          uploadedUrl = data.url;
        }
      } catch (uploadErr) {
        console.warn("Server upload fallback to preview URL:", uploadErr);
      }

      const finalImageUrl = uploadedUrl || uploadData.preview;

      const newCraftItem = {
        id: "craft-custom-" + Date.now(),
        title: uploadData.title,
        description: uploadData.description,
        materials: uploadData.materials || "Bahan daur ulang pilihan",
        category: uploadData.category || "Lainnya",
        imageUrl: finalImageUrl,
        authorId: user?.uid || sessionUser?.id || "guest",
        authorName: currentUserName,
        authorPhoto: user?.photoURL || sessionUser?.avatar || null,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
      };

      // Try saving to Firestore if connected and user logged in via Firebase
      if (db && user) {
        try {
          await addDoc(collection(db, "recycle-crafts"), {
            ...newCraftItem,
            createdAt: serverTimestamp(),
          });
        } catch (dbErr) {
          console.warn("Firestore save fallback to local:", dbErr);
        }
      }

      // Persist to localStorage for instant local availability
      try {
        const savedCustom = localStorage.getItem("bumi_bersih_local_crafts");
        const list = savedCustom ? JSON.parse(savedCustom) : [];
        list.unshift(newCraftItem);
        localStorage.setItem("bumi_bersih_local_crafts", JSON.stringify(list));
      } catch (storageErr) {
        console.error(storageErr);
      }

      setShowUploadModal(false);
      setUploadData({
        title: "",
        description: "",
        materials: "",
        category: "Plastik",
        file: null,
        preview: null,
      });

      // Update state immediately
      setPosts((prev) => [newCraftItem, ...prev]);
      showToast(`Karya "${newCraftItem.title}" berhasil diunggah! Terima kasih, Sobat Bumi 🌿`);
    } catch (err) {
      setUploadError("Upload gagal: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // ==========================================
  // FITUR LIKE (Interaktif, Realtime, Persisten)
  // ==========================================
  const handleLike = async (postId) => {
    const isCurrentlyLiked = localLikedIds.includes(postId);
    const newLikedStatus = !isCurrentlyLiked;
    const userIdKey = user?.uid || sessionUser?.id || "guest-user";

    // Update local likes list
    const updatedLocalLikes = newLikedStatus
      ? [...localLikedIds, postId]
      : localLikedIds.filter((id) => id !== postId);

    setLocalLikedIds(updatedLocalLikes);
    try {
      localStorage.setItem(
        "bumi_bersih_craft_likes",
        JSON.stringify(updatedLocalLikes)
      );
    } catch (e) {
      console.error(e);
    }

    // Update post like count in state
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const currentLikes = post.likes || [];
        let updatedLikesList = [...currentLikes];
        if (newLikedStatus) {
          if (!updatedLikesList.includes(userIdKey)) {
            updatedLikesList.push(userIdKey);
          }
        } else {
          updatedLikesList = updatedLikesList.filter((uid) => uid !== userIdKey);
        }
        return { ...post, likes: updatedLikesList };
      })
    );

    // If Firestore post & user is logged in via Firebase, sync to Firestore
    if (db && user && !postId.startsWith("craft-")) {
      try {
        const ref = doc(db, "recycle-crafts", postId);
        await updateDoc(ref, {
          likes: newLikedStatus
            ? arrayUnion(user.uid)
            : arrayRemove(user.uid),
        });
      } catch (err) {
        console.warn("Firestore like sync skipped:", err);
      }
    }
  };

  // ==========================================
  // FITUR COMMENT (Interaktif & Persisten)
  // ==========================================
  const handleComment = async (postId) => {
    const text = commentInputTexts[postId]?.trim();
    if (!text) return;

    const author =
      user?.displayName ||
      sessionUser?.name ||
      guestNames[postId]?.trim() ||
      user?.email?.split("@")[0] ||
      "Sobat Bumi";

    const newComment = {
      userId: user?.uid || sessionUser?.id || "guest",
      userName: author,
      userPhoto: user?.photoURL || sessionUser?.avatar || null,
      text: text,
      createdAt: new Date().toISOString(),
    };

    // Update state immediately
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return { ...post, comments: [...(post.comments || []), newComment] };
      })
    );

    // Save to localStorage so comments persist
    try {
      const savedCommentsStr = localStorage.getItem("bumi_bersih_craft_comments");
      const currentCommentsMap = savedCommentsStr
        ? JSON.parse(savedCommentsStr)
        : {};
      currentCommentsMap[postId] = [
        ...(currentCommentsMap[postId] || []),
        newComment,
      ];
      localStorage.setItem(
        "bumi_bersih_craft_comments",
        JSON.stringify(currentCommentsMap)
      );
    } catch (e) {
      console.error(e);
    }

    // Reset input
    setCommentInputTexts((prev) => ({ ...prev, [postId]: "" }));

    // Sync with Firestore if logged in via Firebase
    if (db && user && !postId.startsWith("craft-")) {
      try {
        await updateDoc(doc(db, "recycle-crafts", postId), {
          comments: arrayUnion(newComment),
        });
      } catch (err) {
        console.warn("Firestore comment sync skipped:", err);
      }
    }
  };

  // ==========================================
  // FITUR SAVE / DOWNLOAD GAMBAR
  // ==========================================
  const handleDownloadImage = async (imageUrl, title) => {
    try {
      const safeName = (title || "recycle-craft")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");
      const filename = `${safeName}.jpg`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      showToast(`Gambar "${title}" berhasil disimpan!`);
    } catch (err) {
      console.warn("Direct blob download failed, trying fallback:", err);
      // Fallback: open in new tab
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.download = (title || "recycle-craft") + ".jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Gambar dibuka di tab baru untuk disimpan.", "info");
    }
  };

  // Filter posts based on search & category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        !searchQuery.trim() ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.materials?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.authorName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "Semua" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const categories = ["Semua", "Plastik", "Kardus", "Kaleng", "Kain", "Kertas"];

  const isLoggedIn = !!(user || sessionUser);
  const currentUserName = user?.displayName || sessionUser?.name || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/40 via-white to-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===================== HERO HEADER ===================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#66AC6E]/10 text-[#66AC6E] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles size={16} /> Galeri Kreasi Daur Ulang Ramah Lingkungan
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Recycle <span className="text-[#66AC6E]">Craft</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Temukan ragam karya kreatif bernilai guna dari sampah daur ulang.
            Sukai, komentari, dan simpan gambar karya favoritmu untuk dijadikan inspirasi di rumah!
          </p>

          {/* Auth status hint */}
          {!isLoggedIn && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
              <Info size={13} />
              <span>
                <Link href="/sign-in" className="text-[#66AC6E] font-semibold hover:underline">Masuk</Link>
                {" "}untuk menyimpan like dan komentar secara permanen
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-[#66AC6E] hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition shadow-md hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <Upload size={18} /> Upload Karyamu
            </button>
            <Link
              href="/kuis"
              className="flex items-center gap-2 bg-[#E3B214] hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-bold transition shadow-md hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <Sparkles size={18} /> Uji Wawasan di Kuis
            </Link>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* ===================== FILTER & SEARCH BAR ===================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-[#66AC6E] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari karya atau bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#66AC6E] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ===================== GRID POSTS ===================== */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin text-[#66AC6E] mb-3" size={40} />
            <p className="text-sm">Memuat galeri karya daur ulang...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 max-w-lg mx-auto">
            <div className="text-5xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Tidak Ada Karya Ditemukan
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Coba gunakan kata kunci lain atau pilih kategori &quot;Semua&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="bg-[#66AC6E] text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => {
              const userIdKey = user?.uid || sessionUser?.id || "guest-user";
              const isLiked =
                localLikedIds.includes(post.id) ||
                (userIdKey !== "guest-user" && post.likes?.includes(userIdKey));
              const likeCount = post.likes?.length || 0;
              const isCommentActive = activeCommentPostId === post.id;
              const commentsList = post.comments || [];

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={post.imageUrl || "/images/crafts/pot_tanaman_botol.jpg"}
                      fill
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setZoomPost(post)}
                      unoptimized
                    />

                    {/* Category tag */}
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Tag size={12} className="text-[#66AC6E]" />
                        {post.category}
                      </div>
                    )}

                    {/* Floating Save & Zoom Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleDownloadImage(post.imageUrl, post.title)}
                        className="bg-white/90 hover:bg-white text-gray-700 hover:text-[#66AC6E] p-2 rounded-full shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-95"
                        title="Simpan / Unduh Gambar"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => setZoomPost(post)}
                        className="bg-white/90 hover:bg-white text-gray-700 hover:text-[#66AC6E] p-2 rounded-full shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-95"
                        title="Perbesar Tampilan"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Author badge */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#66AC6E] flex items-center justify-center text-white text-xs font-bold overflow-hidden relative flex-shrink-0">
                          {post.authorPhoto ? (
                            <Image
                              src={post.authorPhoto}
                              fill
                              alt=""
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            post.authorName?.[0]?.toUpperCase() || "B"
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {post.authorName || "Sobat Bumi"}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {post.isDefault ? "Kreasi Terverifikasi" : "Karya Anggota"}
                          </p>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h3
                        onClick={() => setZoomPost(post)}
                        className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-1 hover:text-[#66AC6E] cursor-pointer transition"
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                        {post.description}
                      </p>

                      {/* Materials */}
                      {post.materials && (
                        <div className="bg-green-50/70 border border-green-100 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-gray-700 mb-4">
                          <span className="font-semibold text-[#66AC6E] block mb-0.5">
                            Bahan Daur Ulang:
                          </span>
                          <span className="line-clamp-1">{post.materials}</span>
                        </div>
                      )}
                    </div>

                    {/* Like, Comment & Download Action Bar */}
                    <div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition active:scale-95"
                            title={isLiked ? "Hapus suka" : "Suka karya ini"}
                          >
                            <Heart
                              size={19}
                              className={`transition-all duration-200 ${
                                isLiked
                                  ? "fill-rose-500 text-rose-500 scale-110"
                                  : "text-gray-400 hover:text-rose-400"
                              }`}
                            />
                            <span className={isLiked ? "text-rose-600 font-bold" : "text-gray-600"}>
                              {likeCount}
                            </span>
                          </button>

                          {/* Comment Toggle Button */}
                          <button
                            onClick={() =>
                              setActiveCommentPostId(
                                isCommentActive ? null : post.id
                              )
                            }
                            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition active:scale-95 ${
                              isCommentActive
                                ? "text-[#66AC6E]"
                                : "text-gray-600 hover:text-[#66AC6E]"
                            }`}
                            title="Lihat / tulis komentar"
                          >
                            <MessageCircle size={19} />
                            <span>{commentsList.length}</span>
                          </button>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={() => handleDownloadImage(post.imageUrl, post.title)}
                          className="flex items-center gap-1 text-xs text-[#66AC6E] hover:text-green-800 font-bold bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition active:scale-95"
                          title="Simpan gambar ke perangkat"
                        >
                          <Download size={14} />
                          <span>Simpan</span>
                        </button>
                      </div>

                      {/* ===================== COMMENT SECTION ===================== */}
                      {isCommentActive && (
                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
                          {/* Comments List */}
                          <div className="max-h-44 overflow-y-auto space-y-2.5 pr-1 text-xs">
                            {commentsList.length === 0 ? (
                              <p className="text-gray-400 italic text-center py-2">
                                Belum ada komentar. Tulis yang pertama!
                              </p>
                            ) : (
                              commentsList.map((c, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className="w-6 h-6 rounded-full bg-[#66AC6E] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden relative">
                                    {c.userPhoto ? (
                                      <Image
                                        src={c.userPhoto}
                                        fill
                                        alt=""
                                        className="object-cover"
                                        unoptimized
                                      />
                                    ) : (
                                      c.userName?.[0]?.toUpperCase() || "U"
                                    )}
                                  </div>
                                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-3 py-2 flex-1">
                                    <span className="font-bold text-gray-800 text-[11px] block mb-0.5">
                                      {c.userName}
                                    </span>
                                    <p className="text-gray-700 leading-relaxed text-[11px]">
                                      {c.text}
                                    </p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Write Comment Form */}
                          <div className="space-y-1.5">
                            {/* Guest name field if not logged in */}
                            {!isLoggedIn && (
                              <input
                                type="text"
                                placeholder="Nama kamu (opsional)"
                                value={guestNames[post.id] || ""}
                                onChange={(e) =>
                                  setGuestNames((p) => ({
                                    ...p,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#66AC6E]"
                              />
                            )}
                            {/* Show logged-in name hint */}
                            {isLoggedIn && currentUserName && (
                              <p className="text-[10px] text-gray-400 pl-1">
                                Berkomentar sebagai <span className="font-semibold text-[#66AC6E]">{currentUserName}</span>
                              </p>
                            )}

                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={commentInputTexts[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputTexts((p) => ({
                                    ...p,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) =>
                                  e.key === "Enter" && handleComment(post.id)
                                }
                                placeholder="Tulis komentar kreasi..."
                                className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2 outline-none focus:ring-2 focus:ring-[#66AC6E] focus:bg-white transition"
                              />
                              <button
                                onClick={() => handleComment(post.id)}
                                disabled={!commentInputTexts[post.id]?.trim()}
                                className="w-8 h-8 rounded-full bg-[#66AC6E] hover:bg-green-700 disabled:opacity-40 text-white flex items-center justify-center transition shadow-sm active:scale-95 flex-shrink-0"
                                title="Kirim Komentar"
                              >
                                <Send size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ===================== MODAL ZOOM / LIGHTBOX ===================== */}
      {zoomPost && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setZoomPost(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
            >
              <X size={20} />
            </button>

            {/* High Res Image */}
            <div className="relative w-full aspect-video bg-gray-900">
              <Image
                src={zoomPost.imageUrl}
                fill
                alt={zoomPost.title}
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Details & Actions */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-[#66AC6E]/10 text-[#66AC6E] text-xs font-bold px-3 py-1 rounded-full mb-1">
                    {zoomPost.category || "Kerajinan Daur Ulang"}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                    {zoomPost.title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Oleh {zoomPost.authorName || "Sobat Bumi"}
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadImage(zoomPost.imageUrl, zoomPost.title)}
                  className="flex items-center justify-center gap-2 bg-[#66AC6E] hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Download size={16} /> Simpan Gambar
                </button>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {zoomPost.description}
              </p>

              {zoomPost.materials && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs sm:text-sm text-gray-700">
                  <span className="font-bold text-[#66AC6E] block mb-1">
                    Bahan-bahan yang Dibutuhkan:
                  </span>
                  {zoomPost.materials}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL UPLOAD ===================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Upload <span className="text-[#66AC6E]">Karya Daur Ulang</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Bagikan ide kerajinan kreatifmu kepada sobat Bumi Bersih
                </p>
              </div>
              <button
                onClick={() => { setShowUploadModal(false); setUploadError(""); }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error message */}
            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <AlertCircle size={16} />
                {uploadError}
              </div>
            )}

            {/* Image Upload Area */}
            <label className="block w-full aspect-video bg-gray-50 rounded-2xl overflow-hidden cursor-pointer mb-4 relative border-2 border-dashed border-gray-300 hover:border-[#66AC6E] transition group">
              {uploadData.preview ? (
                <Image
                  src={uploadData.preview}
                  fill
                  alt="preview"
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 group-hover:text-[#66AC6E] transition">
                  <Upload size={36} />
                  <span className="text-xs sm:text-sm font-semibold">
                    Klik atau tarik gambar karya ke sini
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Mendukung JPG, PNG, WEBP
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Form Fields */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Judul Karya <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pot Karakter dari Botol Plastik"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kategori Bahan
                </label>
                <select
                  value={uploadData.category}
                  onChange={(e) =>
                    setUploadData((p) => ({ ...p, category: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] bg-white"
                >
                  <option value="Plastik">Plastik (Botol / Sendok / Gelas)</option>
                  <option value="Kardus">Kardus / Karton</option>
                  <option value="Kaleng">Kaleng / Logam</option>
                  <option value="Kain">Kain Perca / Baju Lama</option>
                  <option value="Kertas">Kertas Koran / Majalah</option>
                  <option value="Kaca">Kaca / Botol Sirup</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Bahan yang Digunakan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Botol 1.5L, cat akrilik, tali rami"
                  value={uploadData.materials}
                  onChange={(e) =>
                    setUploadData((p) => ({ ...p, materials: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Deskripsi / Cara Pembuatan Singkat
                </label>
                <textarea
                  placeholder="Jelaskan cara membuat atau keunikan karya daur ulang ini..."
                  value={uploadData.description}
                  onChange={(e) =>
                    setUploadData((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-[#66AC6E] text-white py-3 rounded-full font-bold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sedang Mengunggah...
                </>
              ) : (
                "Publikasikan Karya"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
