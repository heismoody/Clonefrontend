import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { MobileAppBanner } from "@/components/mobile-app-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Popcorns - Stream Movies & TV Shows",
  description: "Your premium streaming platform for movies and TV shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MobileAppBanner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
