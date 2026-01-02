"use client";
import { useState, useEffect } from "react";
import { Heart, MessageCircle, X } from "lucide-react";
import Image from "next/image";

/* CARD COMPONENT */
function CardItem({
  username,
  likes: initialLikes,
  title,
  description,
  imageUrl,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [comment, setComment] = useState("");

  const toggleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* HEADER */}
        <div className="bg-[#66AC6E] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="font-medium">{username}</span>
          </div>
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            {likes}
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-white" : ""
              }`}
            />
          </button>
        </div>

        {/* IMAGE - UKURAN TETAP W=387 H=296 */}
        <div
          onClick={() => setIsZoomOpen(true)}
          className="w-full h-[296px] bg-gray-100 cursor-pointer relative overflow-hidden"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-2">🖼️</div>
                <p className="text-sm">Image Placeholder</p>
                <p className="text-xs mt-1">387 × 296</p>
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>
          <button
            onClick={() => setIsCommentOpen(true)}
            className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-700 font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            Komentar
          </button>
        </div>
      </div>

      {/* ZOOM MODAL */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomOpen(false);
              }}
              className="absolute -top-12 right-0 bg-white rounded-full p-3"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={imageUrl || "/placeholder.png"}
              alt={title}
              width={800}
              height={600}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* COMMENT MODAL */}
      {isCommentOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">Tulis Komentar</h3>
              <button onClick={() => setIsCommentOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-5">
              <textarea
                className="w-full border rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#66AC6E]"
                placeholder="Tulis komentar..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="p-5 flex justify-end gap-3 border-t">
              <button onClick={() => setIsCommentOpen(false)}>
                Batal
              </button>
              <button
                className="bg-[#66AC6E] text-white px-5 py-2 rounded-lg"
                onClick={() => {
                  setComment("");
                  setIsCommentOpen(false);
                }}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* GRID (DEFAULT EXPORT) */
export default function QuizCard() {
  const [fanworks, setFanworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFanworks();
  }, []);

  const fetchFanworks = async () => {
    try {
      const res = await fetch("/api/fanworks", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setFanworks(data.data);
      }
    } catch (error) {
      console.error("Fetch fanworks error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66AC6E] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (fanworks.length === 0) {
    return (
      <div className="py-12 px-4">
        <div className="text-center text-gray-500">
          Belum ada fanwork yang dipublikasikan
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {fanworks.map((item) => (
          <CardItem
            key={item.id}
            username={item.user?.name || "User"}
            likes={0}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}