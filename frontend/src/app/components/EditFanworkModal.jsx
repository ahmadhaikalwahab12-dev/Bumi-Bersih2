"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function EditFanworkModal({ fanwork, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isAgree, setIsAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load data fanwork ke form
  useEffect(() => {
    if (fanwork) {
      setTitle(fanwork.title || "");
      setDescription(fanwork.description || "");
      setImagePreview(fanwork.imageUrl || "");
    }
  }, [fanwork]);

  // Handle upload gambar baru
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (12MB)
    if (file.size > 12 * 1024 * 1024) {
      alert("❌ Ukuran gambar maksimal 12MB!");
      return;
    }

    // Validasi tipe file
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("❌ Hanya file JPG, PNG, GIF, atau WEBP yang diperbolehkan!");
      return;
    }

    setNewImage(file);
    
    // Preview gambar baru
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle hapus gambar preview
  const handleRemoveImage = () => {
    setImagePreview("");
    setNewImage(null);
  };

  // Handle submit edit
  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("❌ Judul dan deskripsi harus diisi!");
      return;
    }

    if (!isAgree) {
      alert("❌ Anda harus menyetujui syarat dan ketentuan!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      
      // Jika ada gambar baru, kirim gambar baru
      if (newImage) {
        formData.append("image", newImage);
      }

      const res = await fetch(`/api/fanworks?id=${fanwork.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Karya berhasil diupdate!");
        onSuccess(); // Refresh data
        onClose(); // Tutup modal
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("❌ Terjadi kesalahan saat mengupdate karya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#6EAD75] w-full max-w-2xl rounded-3xl shadow-xl p-10 max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
        >
          <X size={24} className="text-[#6EAD75]" />
        </button>

        {/* HEADER */}
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          Edit <span className="text-[#E3B214]">Fanwork</span>
        </h1>

        <div className="space-y-6">
          {/* JUDUL */}
          <div>
            <label className="text-sm font-semibold text-white">Judul fanwork:</label>
            <input
              type="text"
              className="mt-2 w-full px-4 py-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#E3B214]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul..."
            />
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-sm font-semibold text-white">Deskripsi fanwork:</label>
            <textarea
              className="mt-2 w-full px-4 py-3 h-32 rounded-lg bg-white outline-none resize-none focus:ring-2 focus:ring-[#E3B214]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tulis deskripsi..."
            />
          </div>

          {/* GAMBAR */}
          <div>
            <label className="text-sm font-semibold text-white">Gambar fanwork:</label>
            <p className="text-xs text-white/80 mt-1">
              Ukuran gambar tidak dapat melebihi dari 12MB dan merupakan tipe file JPG, PNG, GIF, atau WEBP.
            </p>

            <div className="mt-3 relative border-2 border-dashed border-white rounded-xl bg-white/20 overflow-hidden">
              {imagePreview ? (
                <div className="relative w-full h-64">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />

                  {/* Delete Image Button - di dalam area gambar, pojok kanan atas */}
                  <button
                    onClick={handleRemoveImage}
                    type="button"
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition shadow-lg z-10"
                  >
                    <X size={20} />
                  </button>

                  {/* Upload BTN - di dalam area gambar, pojok kanan bawah */}
                  <label className="absolute bottom-3 right-3 cursor-pointer bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg z-10">
                    <Image src="/icon/upload.svg" alt="upload" width={24} height={24} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative w-full h-64 flex flex-col items-center justify-center">
                  <p className="text-white/60 mb-4">Tidak ada gambar</p>
                  
                  {/* Upload BTN - center ketika belum ada gambar */}
                  <label className="cursor-pointer bg-white rounded-full p-3 hover:bg-gray-100 transition shadow-lg">
                    <Image src="/icon/upload.svg" alt="upload" width={32} height={32} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* AGREEMENT */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={() => setIsAgree(!isAgree)}
              className="mt-1 w-4 h-4 accent-[#E3B214]"
            />
            <p className="text-xs text-white leading-relaxed">
              Dengan melanjutkan, anda setuju dengan Kebijakan Publikasi serta{" "}
              <span className="underline cursor-pointer">Syarat dan Ketentuan</span> kami.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition shadow-md"
            >
              Batal
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-[#E3B214] hover:bg-[#c99b0f] text-white font-semibold py-3 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Konfirmasi Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}