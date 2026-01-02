"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, User, MessageCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import EditFanworkModal from "@/app/components/EditFanworkModal";

export default function ManageFanwork() {
  const router = useRouter();

  // States
  const [fanworks, setFanworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [likesData, setLikesData] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [editingFanwork, setEditingFanwork] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingFanworkId, setDeletingFanworkId] = useState(null);

  // Fetch Functions
  const fetchFanworks = async () => {
    try {
      const res = await fetch("/api/my-fanworks", {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success) {
        setFanworks(data.data);
        
        data.data.forEach(work => {
          fetchLikesData(work.id);
          fetchCommentsData(work.id);
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data fanwork:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikesData = async (fanworkId) => {
    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/likes`);
      const json = await res.json();
      
      if (json.success) {
        setLikesData(prev => ({
          ...prev,
          [fanworkId]: json.data
        }));
      }
    } catch (error) {
      console.error("Fetch likes error:", error);
    }
  };

  const fetchCommentsData = async (fanworkId) => {
    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/comments`);
      const json = await res.json();
      
      if (json.success) {
        setCommentsData(prev => ({
          ...prev,
          [fanworkId]: json.data
        }));
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  };

  useEffect(() => {
    fetchFanworks();
  }, []);

  // Handler Functions
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLike = async (fanworkId) => {
    try {
      const currentLikeData = likesData[fanworkId];
      const isLiked = currentLikeData?.isLiked;

      if (isLiked) {
        const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
          method: "DELETE",
        });
        const json = await res.json();
        
        if (json.success) {
          setLikesData(prev => ({
            ...prev,
            [fanworkId]: json.data
          }));
        }
      } else {
        const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
          method: "POST",
        });
        const json = await res.json();
        
        if (json.success) {
          setLikesData(prev => ({
            ...prev,
            [fanworkId]: json.data
          }));
        }
      }
    } catch (error) {
      console.error("Like/Unlike error:", error);
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [id]: value,
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
        setCommentInputs((prev) => ({
          ...prev,
          [fanworkId]: "",
        }));

        fetchCommentsData(fanworkId);
      }
    } catch (error) {
      console.error("Post comment error:", error);
    }
  };

  const handleDelete = (id) => {
    setDeletingFanworkId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingFanworkId) return;

    try {
      setFanworks((prev) => prev.filter((item) => item.id !== deletingFanworkId));
      setShowDeleteModal(false);

      const res = await fetch(`/api/fanworks?id=${deletingFanworkId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchFanworks();
      } else {
        alert("❌ Gagal menghapus karya dari database");
        fetchFanworks();
      }
    } catch (error) {
      console.error("Error delete:", error);
      alert("❌ Terjadi kesalahan saat menghapus");
      fetchFanworks();
    } finally {
      setDeletingFanworkId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingFanworkId(null);
  };

  const handleEdit = (fanwork) => {
    setEditingFanwork(fanwork);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    fetchFanworks();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F1E7]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66AC6E] mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-[#66AC6E]">Memuat karya...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F1E7]">
      <div className="flex pt-20">
        
        {/* SIDEBAR */}
        <div className="hidden lg:block w-64 p-6">
          <div className="bg-white border-4 border-[#66AC6E] rounded-3xl p-6 sticky top-24 shadow-lg">
            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link href="/manage-fanwork" className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium shadow-md">
                  Manage Fanwork
                </Link>
              </li>
              <li>
                <Link href="/fanwork-liked" className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200">
                  Liked Fanwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Empty State */}
            {fanworks.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-gray-500 text-lg mb-6">Belum ada fanwork.</p>
                <Link href="/fanwork">
                  <button className="bg-[#66AC6E] hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                    Jelajahi Fanwork
                  </button>
                </Link>
              </div>
            ) : (
              
              /* Fanwork Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fanworks.map((item) => {
                  const likeData = likesData[item.id] || { totalLikes: 0, isLiked: false };
                  const workComments = commentsData[item.id] || [];
                  
                  return (
                    <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                      
                      {/* Header */}
                      <div className="flex items-center justify-between bg-[#66AC6E] px-5 py-3 rounded-t-3xl">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <User size={16} className="text-[#66AC6E]" />
                          </div>
                          <span className="text-white font-semibold text-sm">
                            {item.user?.name || "Verdinanda56"}
                          </span>
                        </div>
                        <button onClick={() => handleLike(item.id)} className="flex items-center space-x-2 text-white hover:scale-110 transition">
                          <span className="font-semibold text-sm">{likeData.totalLikes}</span>
                          <Heart size={18} className={likeData.isLiked ? "fill-current" : ""} />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="relative w-full h-[296px] bg-gray-100 overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
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
                        <h3 className="text-lg font-bold text-[#66AC6E] mb-2">{item.title}</h3>

                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {expandedCards[item.id]
                            ? item.description
                            : item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description}
                        </p>

                        {item.description.length > 100 && (
                          <button onClick={() => toggleExpand(item.id)} className="text-[#66AC6E] font-semibold text-sm mb-3 flex items-center space-x-1 hover:underline">
                            <span>{expandedCards[item.id] ? "Tutup" : "Baca lebih lanjut"}</span>
                            <span>{expandedCards[item.id] ? "▴" : "▾"}</span>
                          </button>
                        )}

                        <div className="mb-3">
                          <p className="text-sm text-gray-500">
                            {workComments.length === 0 ? "Belum ada komentar" : `${workComments.length} komentar`}
                          </p>
                        </div>

                        {/* Comments Section */}
                        {expandedCards[item.id] && (
                          <div className="mb-4 pt-4 border-t border-gray-200">
                            <button onClick={() => toggleExpand(item.id)} className="text-xs font-semibold text-gray-700 mb-3 flex items-center space-x-1 hover:text-[#66AC6E]">
                              <span>Tutup</span>
                              <span>▴</span>
                            </button>

                            {workComments.length > 0 && (
                              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                                {workComments.map((comment) => (
                                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <div className="w-5 h-5 bg-[#66AC6E] rounded-full flex items-center justify-center">
                                        <User size={10} className="text-white" />
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700">
                                        {comment.user?.name || "User"}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 pl-7">{comment.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="Ketik komentar..."
                                value={commentInputs[item.id] || ""}
                                onChange={(e) => handleCommentChange(item.id, e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handlePostComment(item.id);
                                  }
                                }}
                                className="flex-1 py-2 px-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#66AC6E] transition"
                              />
                              <button onClick={() => handlePostComment(item.id)} className="bg-[#E3B214] hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-md">
                                Post
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button onClick={() => handleDelete(item.id)} className="bg-[#E85D75] hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition shadow-md">
                            Hapus
                          </button>
                          <button onClick={() => handleEdit(item)} className="flex-1 bg-[#E3B214] hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl transition shadow-md">
                            Edit Postingan
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#66AC6E] rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in">
            <div className="flex justify-center pt-8 pb-4">
              <div className="w-16 h-16 bg-[#E3B214] rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="px-8 pb-6 text-center">
              <h3 className="text-white font-bold text-lg mb-2">
                Anda yakin ingin menghapus fanwork ini?
              </h3>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={confirmDelete} className="flex-1 bg-[#E3B214] hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                Hapus
              </button>
              <button onClick={cancelDelete} className="flex-1 bg-white hover:bg-gray-100 text-[#66AC6E] font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingFanwork && (
        <EditFanworkModal
          fanwork={editingFanwork}
          onClose={() => {
            setShowEditModal(false);
            setEditingFanwork(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}