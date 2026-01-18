import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter();

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
        className={`${inter.className} antialiased`}
      >
        <Toaster></Toaster>
        <Navbar></Navbar>

        <main className='bg-gray-50 text-gray-900 min-h-[calc(100vh - 302px)]'>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
