import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
//import CanvasWash from "@/components/CanvasWash/CanvasWash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthButtons from "@/components/Header/AuthButtons";
import { Suspense } from "react";

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
        <Header>
          <Suspense fallback={<div></div>}>
            <AuthButtons />
          </Suspense>
        </Header>
        <main className="main">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
