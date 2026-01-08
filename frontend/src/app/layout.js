import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400","500","600","700","800","900"],
  subsets: ["latin"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bumi Bersih",
  description: "Platform edukasi kebersihan lingkungan dan daur ulang",
  icons: {
    icon: "/icon/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}