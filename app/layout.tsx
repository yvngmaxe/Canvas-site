import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
//import CanvasWash from "@/components/CanvasWash/CanvasWash";
import Header from "@/components/Header"; // 追加
import Footer from "@/components/Footer"; // 追加

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "株式会社Canvas",
  description: "広島に新しい教育の流れを作る",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${noto.className} ${geistSans.variable} ${geistMono.variable}`}
      >
        <div id="top-of-page" />
        {/*<CanvasWash />*/}
        <Header /> {/* 追加 */}
        {children}
        <ScrollToTopButton />
        <Footer /> {/* 追加 */}
      </body>
    </html>
  );
}
