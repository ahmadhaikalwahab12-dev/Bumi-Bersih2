"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Notifikasi from "./Notifikasi";

export default function UploadFanwork({ onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setAlert({
        type: "error",
        message: "Format tidak didukung. Gunakan JPG, PNG, GIF, atau WEBP",
      });
      return;
    }

    if (selectedFile.size > 12 * 1024 * 1024) {
      setAlert({
        type: "error",
        message: "Ukuran file maksimal 12MB",
      });
      return;
    }

    setFile(selectedFile);
    setAlert({ type: "", message: "" });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      setAlert({ type: "error", message: "Judul wajib diisi!" });
      return;
    }

    if (!desc.trim()) {
      setAlert({ type: "error", message: "Deskripsi wajib diisi!" });
      return;
    }

    if (!file) {
      setAlert({ type: "error", message: "Gambar wajib dipilih!" });
      return;
    }

    if (!isAgree) {
      setAlert({ type: "error", message: "Anda harus menyetujui kebijakan!" });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", desc.trim());
      formData.append("image", file);

      const res = await fetch("/api/fanworks", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error("Server tidak mengembalikan JSON");
      }

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Sesi login habis. Silakan login kembali.");
        }
        throw new Error(data?.message || "Upload gagal");
      }

      setAlert({
        type: "success",
        message: "🎉 Karya berhasil diunggah!",
      });

      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);

      setTitle("");
      setDesc("");
      setFile(null);
      setPreview(null);
      setIsAgree(false);

      if (onSuccess) {
        onSuccess(data.data);
      }

      setTimeout(() => {
        onClose?.();
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      setAlert({
        type: "error",
        message: err.message || "Terjadi kesalahan saat upload",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notifikasi show={showNotif} message="🎉 Karya berhasil diupload!" />

      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">
        <div className="bg-[#6EAD75] w-full max-w-2xl rounded-3xl shadow-xl p-10 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-6 text-white text-2xl hover:text-gray-200 transition"
          >
            ✕
          </button>

          {alert.message && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg text-center font-semibold ${
                alert.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {alert.message}
            </div>
          )}

          <h1 className="text-center text-4xl font-bold text-white mb-10">
            Unggah <span className="text-[#E3B214]">Karya</span>
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-white">
                Judul fanwork <span className="text-[#E3B214]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full px-4 py-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#E3B214] transition"
                placeholder="Ketik di sini..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                maxLength={200}
              />
              <p className="text-xs text-white/70 mt-1">{title.length}/200 karakter</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-white">
                Deskripsi fanwork <span className="text-[#E3B214]">*</span>
              </label>
              <textarea
                className="mt-2 w-full px-4 py-3 rounded-lg bg-white h-32 resize-none outline-none focus:ring-2 focus:ring-[#E3B214] transition"
                placeholder="Ketik di sini..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={loading}
                maxLength={1000}
              />
              <p className="text-xs text-white/70 mt-1">{desc.length}/1000 karakter</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-white">
                Gambar fanwork <span className="text-[#E3B214]">*</span>
              </label>
              <p className="text-xs text-white/80 mt-1">
                Maksimal 12MB (JPG, PNG, GIF, WEBP)
              </p>

              {preview ? (
                <div className="mt-3 relative rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg text-xs">
                    {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => !loading && fileInputRef.current?.click()}
                  className={`mt-3 border-2 border-dashed border-white rounded-xl bg-white/40 h-40 flex flex-col justify-center items-center transition ${
                    loading
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-white/50"
                  }`}
                >
                  <Image src="/icon/upfan.svg" alt="upload" width={50} height={50} />
                  <p className="text-white/90 text-sm mt-2">Klik untuk pilih gambar</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                hidden
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>

            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
                disabled={loading}
                className="mr-3 mt-1 accent-[#E3B214] w-4 h-4 cursor-pointer"
              />
              <p className="text-xs text-white">
                Dengan melanjutkan, anda setuju dengan{" "}
                <a href="#" className="underline font-semibold">
                  Kebijakan Publikasi
                </a>{" "}
                serta{" "}
                <a href="#" className="underline font-semibold">
                  Syarat dan Ketentuan
                </a>
                .
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!isAgree || loading}
              className={`mt-6 w-full py-3 font-bold text-lg rounded-lg transition-all ${
                isAgree && !loading
                  ? "bg-[#E3B214] hover:bg-[#c99b0f] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Mengunggah...
                </span>
              ) : (
                "Upload Karyamu!"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}