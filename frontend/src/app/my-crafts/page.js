"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection, getDocs, updateDoc, deleteDoc,
  doc, query, where, orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { Pencil, Trash2, X, Loader2, Upload } from "lucide-react";
import Link from "next/link";

export default function MyCraftsPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) fetchMyPosts(u.uid);
      else setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const fetchMyPosts = async (uid) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "recycle-crafts"),
        where("authorId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditData({ title: post.title, description: post.description || "" });
  };

  const handleSaveEdit = async () => {
    if (!editData.title.trim()) return alert("Judul tidak boleh kosong!");
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "recycle-crafts", editingPost.id), {
        title: editData.title,
        description: editData.description,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, ...editData } : p
        )
      );
      setEditingPost(null);
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "recycle-crafts", deletingId));
      setPosts((prev) => prev.filter((p) => p.id !== deletingId));
      setShowDeleteModal(false);
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Login dulu untuk melihat karya kamu</p>
          <Link href="/sign-in">
            <button className="bg-[#66AC6E] text-white px-6 py-2.5 rounded-full font-semibold">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#66AC6E]">
              Karya <span className="text-[#E3B214]">Saya</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Kelola karya daur ulang yang sudah kamu upload</p>
          </div>
          <Link href="/recycle-craft">
            <button className="flex items-center gap-2 bg-[#66AC6E] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition">
              <Upload size={16} /> Upload Baru
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#66AC6E]" size={40} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400 mb-4">Belum ada karya yang diupload</p>
            <Link href="/recycle-craft">
              <button className="bg-[#66AC6E] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition">
                Upload Karya Pertama
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
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
                  <h3 className="font-bold text-gray-800 mb-1 truncate">{post.title}</h3>
                  {post.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#E3B214] text-white py-2 rounded-xl text-sm font-semibold hover:bg-yellow-500 transition"
                    >
                      <Pencil size={15} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#66AC6E]">Edit Karya</h2>
              <button onClick={() => setEditingPost(null)}>
                <X size={22} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* Preview gambar */}
            <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image src={editingPost.imageUrl} fill alt="preview" className="object-cover" unoptimized />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <p className="text-white text-xs">Gambar tidak bisa diubah</p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Judul karya *"
              value={editData.title}
              onChange={(e) => setEditData((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] mb-3"
            />

            <textarea
              placeholder="Deskripsi (opsional)"
              value={editData.description}
              onChange={(e) => setEditData((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#66AC6E] mb-4 resize-none"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setEditingPost(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex-1 bg-[#66AC6E] text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Hapus Karya?</h3>
            <p className="text-gray-500 text-sm mb-6">Karya yang dihapus tidak bisa dikembalikan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}