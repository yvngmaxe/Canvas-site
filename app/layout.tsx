import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AuthButtons from "@/components/Header/AuthButtons";
import { createServerSupabaseClient } from "@/app/_libs/supabase";
import RevealController from "@/components/RevealController/RevealController";
import Script from "next/script";

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

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-serif-jp",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://e-canvas.co.jp/";

export const metadata: Metadata = {
  title: "株式会社CANVAS",
  description: "広島に新しい教育の流れを作る",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "株式会社CANVAS",
    title: "株式会社CANVAS",
    description: "広島に新しい教育の流れを作る",
    images: [
      {
        url: "/images/NEWS_thumbnail.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社CANVAS",
    description: "広島に新しい教育の流れを作る",
    images: [
      {
        url: "/images/NEWS_thumbnail.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching profile in RootLayout:", error);
    } else {
      profile = data;
    }
  }

  return (
    <html lang="ja">
      <head>
        <link
          rel="preconnect"
          href="https://images.microcms-assets.io"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://images.microcms-assets.io" />
        <meta
          name="google-site-verification"
          content="gVnGve9bdphcn-j-hfpqzQL2GtvoeYpHhWkyrdEJ6TM"
        />
      </head>
      <body
        className={`${noto.className} ${geistSans.variable} ${geistMono.variable} ${notoSerif.variable}`}
      >
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "株式会社CANVAS",
              url: "https://e-canvas.co.jp/",
            }),
          }}
        />
        <div id="top-of-page" />
        <RevealController />
        <Header>
          <AuthButtons user={user} profile={profile} />
        </Header>
        <main className="main">{children}</main>
        <ScrollToTopButton />
        <ContactCTA />
        <Footer />
      </body>
    </html>
  );
}
