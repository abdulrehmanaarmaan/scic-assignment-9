import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
// variable: "--font-geist-mono",
// subsets: ["latin"],
// });

export const metadata = {
  title: "ProductHub",
  description: "A modern product catalog application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${inter.variable} ${geistMono.variable} antialiased`}
        className={`${inter.variable} antialiased`}
      >
        <Toaster></Toaster>
        <Navbar></Navbar>

        <main className='bg-gray-50 text-gray-900'>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
