import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Zen_Kaku_Gothic_New, Noto_Serif_JP } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
// ログイン・新規登録は使う予定がないため一時的に非表示（戻すときはこの import と Header 内のコメントを外す）
// import AuthButtons from "@/components/Header/AuthButtons";
// ヒーロー（HeroCanvas）と同じ書体を、サイト全体の見出しでも使う
import { cormorant, shippori } from "@/components/HeroCanvas/fonts";
import { getCurrentUser } from "@/app/_libs/supabase";
import RevealController from "@/components/RevealController/RevealController";
import { SectionHeader } from "@/components/SectionHeader/index";
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

// 本文の書体。見出しの明朝（しっぽり明朝）と合うよう、游ゴシックに近い柔らかいゴシックにした（旧：Noto Sans JP）
const zenKaku = Zen_Kaku_Gothic_New({
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
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "株式会社CANVAS",
    title: "株式会社CANVAS",
    description: "広島に新しい教育の流れを作る",
    images: [
      {
        url: "/images/canvas_logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社CANVAS",
    description: "広島に新しい教育の流れを作る",
    images: [
      {
        url: "/images/canvas_logo.png",
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
  const { supabase, user } = await getCurrentUser();

  let profile = null;
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("nickname, avatar_url")
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="gVnGve9bdphcn-j-hfpqzQL2GtvoeYpHhWkyrdEJ6TM"
        />

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-46RG1SSQVW"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-46RG1SSQVW');
            `,
          }}
        />

        {/* WebSiteの構造化データ*/}
        <script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "株式会社CANVAS",
              url: "https://e-canvas.co.jp/",
              publisher: {
                "@type": "Organization",
                name: "株式会社CANVAS",
                logo: {
                  "@type": "ImageObject",
                  url: "https://e-canvas.co.jp/images/logo.png",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${zenKaku.className} ${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${cormorant.variable} ${shippori.variable}`}
      >
        <div id="top-of-page" />
        <RevealController />
        <Header>
          {/* <AuthButtons user={user} profile={profile} /> */}
        </Header>
        <main className="main">{children}</main>
        <ScrollToTopButton />
        <SectionHeader label="CONTACT" title="お問い合わせ" />
        <ContactCTA />
        <Footer />
      </body>
    </html>
  );
}
