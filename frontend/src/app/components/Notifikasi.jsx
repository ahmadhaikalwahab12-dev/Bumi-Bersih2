"use client";

export default function Notifikasi({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-in">
      <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
        <span className="text-xl">✅</span>
        <p className="font-semibold">{message}</p>
      </div>

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
