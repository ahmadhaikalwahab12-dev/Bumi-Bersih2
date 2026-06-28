"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection, addDoc, getDocs, updateDoc, doc,
  arrayUnion, arrayRemove, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { Heart, MessageCircle, Upload, X, Send, Loader2 } from "lucide-react";

export default function RecycleCraftPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [uploadData, setUploadData] = useState({
    title: "", description: "", file: null, preview: null,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "recycle-crafts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadData((p) => ({ ...p, file, preview: URL.createObjectURL(file) }));
  };

  const handleUpload = async () => {
    if (!user) return alert("Login dulu ya!");
    if (!uploadData.file || !uploadData.title.trim()) return alert("Judul dan gambar wajib diisi!");

    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", uploadData.file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const { url, error } = await res.json();
      if (error) throw new Error(error);

      await addDoc(collection(db, "recycle-crafts"), {
        title: uploadData.title,
        description: uploadData.description,
        imageUrl: url,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        authorPhoto: user.photoURL || null,
        likes: [],
        comments: [],
        createdAt: serverTimestamp(),
      });

      setShowUploadModal(false);
      setUploadData({ title: "", description: "", file: null, preview: null });
      fetchPosts();
    } catch (err) {
      alert("Upload gagal: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = async (postId, likes) => {
    if (!user) return alert("Login dulu untuk like!");
    const ref = doc(db, "recycle-crafts", postId);
    const liked = likes.includes(user.uid);
    await updateDoc(ref, {
      likes: liked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
    fetchPosts();
  };

  const handleComment = async (postId) => {
    if (!user) return alert("Login dulu untuk komentar!");
    const text = commentTexts[postId]?.trim();
    if (!text) return;
    await updateDoc(doc(db, "recycle-crafts", postId), {
      comments: arrayUnion({
        userId: user.uid,
        userName: user.displayName || user.email,
        userPhoto: user.photoURL || null,
        text,
        createdAt: new Date().toISOString(),
      }),
    });
    setCommentTexts((p) => ({ ...p, [postId]: "" }));
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#66AC6E] mb-2">
            Recycle <span className="text-[#E3B214]">Craft</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Karya daur ulang kreatif dari sobat Bumi Bersih
          </p>
        </div>

        {/* Tombol Upload */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => user ? setShowUploadModal(true) : alert("Login dulu!")}
            className="flex items-center gap-2 bg-[#66AC6E] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
          >
            <Upload size={18} /> Upload Karya
          </button>
        </div>

        {/* Grid Posts */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#66AC6E]" size={40} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Belum ada karya. Jadilah yang pertama upload!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden">

                {/* Gambar */}
                <div className="relative w-full aspect-square bg-gray-100">
                  <Image
                    src={post.imageUrl}
                    fill
                    alt={post.title}
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-4">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#66AC6E] overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                      {post.authorPhoto ? (
                        <Image src={post.authorPhoto} fill alt="" className="object-cover" unoptimized />
                      ) : (
                        <span className="text-white text-xs font-bold">
                          {post.authorName?.[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {post.authorName}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-bold text-gray-800 mb-1">{post.title}</h3>
                  {post.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                  )}

                  {/* Like & Comment */}
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id, post.likes || [])}
                      className="flex items-center gap-1.5 text-sm transition"
                    >
                      <Heart
                        size={18}
                        className={
                          post.likes?.includes(user?.uid)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-400"
                        }
                      />
                      <span className={post.likes?.includes(user?.uid) ? "text-red-500" : "text-gray-500"}>
                        {post.likes?.length || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveComment(activeComment === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#66AC6E] transition"
                    >
                      <MessageCircle size={18} />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>

                  {/* Komentar Section */}
                  {activeComment === post.id && (
                    <div className="mt-3 border-t pt-3">
                      <div className="space-y-2 max-h-36 overflow-y-auto mb-3 pr-1">
                        {(post.comments || []).length === 0 ? (
                          <p className="text-xs text-gray-400">Belum ada komentar</p>
                        ) : (
                          post.comments.map((c, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <div className="w-6 h-6 rounded-full bg-[#66AC6E] flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                                {c.userPhoto ? (
                                  <Image src={c.userPhoto} fill alt="" className="object-cover" unoptimized />
                                ) : (
                                  <span className="text-white text-[10px] font-bold">
                                    {c.userName?.[0]?.toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="bg-gray-50 rounded-xl px-3 py-1.5 flex-1">
                                <span className="text-xs font-semibold text-gray-700">{c.userName} </span>
                                <span className="text-xs text-gray-600">{c.text}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {user ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={commentTexts[post.id] || ""}
                            onChange={(e) =>
                              setCommentTexts((p) => ({ ...p, [post.id]: e.target.value }))
                            }
                            onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                            placeholder="Tulis komentar..."
                            className="flex-1 text-xs border border-gray-200 rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#66AC6E]"
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            className="text-[#66AC6E] hover:text-green-700 transition"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Login untuk berkomentar</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#66AC6E]">Upload Karyamu</h2>
              <button onClick={() => setShowUploadModal(false)}>
                <X size={22} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <label className="block w-full aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer mb-4 relative border-2 border-dashed border-gray-300 hover:border-[#66AC6E] transition">
              {uploadData.preview ? (
                <Image src={uploadData.preview} fill alt="preview" className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <Upload size={32} />
                  <span className="text-sm">Klik untuk pilih gambar</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            <input
              type="text"
              placeholder="Judul karya *"
              value={uploadData.title}
              onChange={(e) => setUploadData((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] mb-3"
            />

            <textarea
              placeholder="Deskripsi (opsional)"
              value={uploadData.description}
              onChange={(e) => setUploadData((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] mb-4 resize-none"
            />

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-[#66AC6E] text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUploading
                ? <><Loader2 size={18} className="animate-spin" /> Mengupload...</>
                : "Upload Karya"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}