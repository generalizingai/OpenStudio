import './globals.css';
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Self-hosted (via next/font) so it always loads - no reliance on a CDN @import.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: 'OpenStudio - AI Image & Video Studio',
  description: 'Generate AI images and videos using 200+ models - Flux, Midjourney, Kling, Veo, Seedance and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
