"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, User, LogOut } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

// MAIN PAGE - LIKED FANWORK //
export default function FanworkLiked() {
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [likedWorks, setLikedWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH LIKED FANWORKS FROM DATABASE
  useEffect(() => {
    fetchLikedFanworks();
  }, []);

  // FUNCTION INI YANG KAMU TANYAKAN - TARUH DI SINI
  const fetchLikedFanworks = async () => {
    try {
      // GANTI ENDPOINT DENGAN QUERY PARAMETER
      const userId = 1; // Atau ambil dari session/auth
      const res = await fetch(`/api/fanworks?filter=liked&userId=${userId}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success) {
        setLikedWorks(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil liked fanworks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePostComment = async (fanworkId) => {
    const commentText = commentInputs[fanworkId]?.trim();
    
    if (!commentText) return;

    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentText,
        }),
      });

      const json = await res.json();

      if (json.success) {
        // Reset input
        setCommentInputs(prev => ({
          ...prev,
          [fanworkId]: ''
        }));

        // Refresh data
        fetchLikedFanworks();
      }
    } catch (error) {
      console.error("Post comment error:", error);
    }
  };

  const handleUnlike = async (fanworkId) => {
    if (!window.confirm('Apakah Anda yakin ingin unlike karya ini?')) return;

    try {
      // Immediately remove from UI
      setLikedWorks(prev => prev.filter(work => work.id !== fanworkId));

      const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!json.success) {
        alert("❌ Gagal unlike karya");
        // Refresh to restore if failed
        fetchLikedFanworks();
      }
    } catch (error) {
      console.error("Unlike error:", error);
      alert("❌ Terjadi kesalahan");
      fetchLikedFanworks();
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66AC6E] mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-[#66AC6E]">Memuat karya yang disukai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">
        {/* Sidebar Menu */}
        <div className="hidden lg:block w-64 p-6">
          <div className="bg-white border-4 border-[#66AC6E] rounded-3xl p-6 sticky top-24 shadow-lg">
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/profile"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/manage-fanwork"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                  Manage Fanwork
                </Link>
              </li>
              <li>
                <Link 
                  href="/fanwork-liked"
                  className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium shadow-md"
                >
                  Liked Fanwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-[#66AC6E] mb-8">Karya yang Disukai</h1>

            {/* Empty State */}
            {likedWorks.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Belum ada karya yang disukai
                </h3>
                <p className="text-gray-500 mb-6">
                  Mulai jelajahi dan like karya favorit Anda!
                </p>
                <Link href="/fanwork">
                  <button className="bg-[#E3B214] hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold transition">
                    Jelajahi Fanwork
                  </button>
                </Link>
              </div>
            ) : (
              /* Fanwork Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {likedWorks.map((work) => (
                  <div key={work.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100">
                    
                    {/* Header with Profile + Likes */}
                    <div className="bg-[#66AC6E] px-5 py-3 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <User size={16} className="text-[#66AC6E]" />
                        </div>
                        <h2 className="font-semibold text-white text-sm">
                          {work.user?.name || "User"}
                        </h2>
                      </div>

                      <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                        <span>{work._count?.likes || 0}</span>
                        <Heart className="fill-current" size={18} />
                      </div>
                    </div>

                    {/* IMAGE - UKURAN TETAP W=387 H=296 */}
                    <div className="relative w-full h-[296px] bg-gray-100 overflow-hidden">
                      {work.imageUrl ? (
                        <Image
                          src={work.imageUrl}
                          alt={work.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-gray-400">
                            <div className="text-6xl mb-2">🖼️</div>
                            <p className="text-sm">Image Placeholder</p>
                            <p className="text-xs mt-1">387 × 296</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#66AC6E] mb-2">
                        {work.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {expandedCards[work.id]
                          ? work.description
                          : work.description.length > 100
                          ? `${work.description.substring(0, 100)}...`
                          : work.description}
                      </p>

                      {/* Read More / Close Button */}
                      {work.description.length > 100 && (
                        <button 
                          onClick={() => toggleExpand(work.id)}
                          className="text-[#66AC6E] font-semibold text-sm flex items-center space-x-1 hover:underline mb-3"
                        >
                          <span>{expandedCards[work.id] ? 'Tutup' : 'Baca lebih lanjut'}</span>
                          <span>{expandedCards[work.id] ? '▴' : '▾'}</span>
                        </button>
                      )}

                      {/* Comments Info */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">
                          {work.comments?.length === 0 
                            ? "Belum ada komentar" 
                            : `${work.comments?.length || 0} komentar`}
                        </p>
                      </div>

                      {/* Comments Section */}
                      {expandedCards[work.id] && (
                        <div className="mb-4 pt-4 border-t border-gray-200">
                          {/* Comments List */}
                          {work.comments && work.comments.length > 0 && (
                            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                              {work.comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-5 h-5 bg-[#66AC6E] rounded-full flex items-center justify-center">
                                      <User size={10} className="text-white" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700">
                                      {comment.user?.name || "User"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 pl-7">
                                    {comment.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Comment Input */}
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Ketik komentar..."
                              value={commentInputs[work.id] || ''}
                              onChange={(e) => handleCommentChange(work.id, e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handlePostComment(work.id);
                                }
                              }}
                              className="flex-1 py-2 px-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#66AC6E] transition"
                            />
                            <button 
                              onClick={() => handlePostComment(work.id)}
                              className="bg-[#E3B214] hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-md"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button 
                          onClick={() => handleUnlike(work.id)}
                          className="bg-[#E85D75] hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition shadow-md"
                        >
                          Unlike
                        </button>
                        <Link href={`/fanwork/${work.id}`} className="flex-1">
                          <button className="w-full bg-[#E3B214] hover:bg-yellow-500 text-white py-3 rounded-xl font-semibold transition shadow-md">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}