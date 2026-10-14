// トップ画面の書体（next/font で読み込む。CSS変数として HeroCanvas.module.css から使う）
import { Cormorant_Garamond, Shippori_Mincho } from 'next/font/google';

// 欧文：Learning, Connected.（斜体）／WE ARE LEARNING DESIGN COMPANY.（立体）
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

// 和文：学びは、紡がれていく。／自分から、人へ、土地へ、未来へ。／クリックして問いを生む
// 日本語の書体は大きいので、先読みはしない（使う文字だけが読み込まれる）
export const shippori = Shippori_Mincho({
  weight: ['500'],
  variable: '--font-shippori',
  display: 'swap',
  preload: false,
});
