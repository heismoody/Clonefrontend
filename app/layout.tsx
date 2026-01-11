import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { MobileAppBanner } from "@/components/mobile-app-banner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Watchflicks - Stream Movies & TV Shows",
    template: "%s | Watchflicks",
  },
  description:
    "Watchflicks is your premium streaming platform for movies and TV shows. Stream the latest releases in high quality on watchflicks.live.",
  keywords: [
    "streaming",
    "movies",
    "tv shows",
    "watch movies online",
    "watchflicks",
    "free streaming",
  ],
  authors: [{ name: "Watchflicks Team" }],
  creator: "Watchflicks",
  publisher: "Watchflicks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://watchflicks.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Watchflicks - Stream Movies & TV Shows",
    description: "Your premium streaming platform for movies and TV shows",
    url: "https://watchflicks.live",
    siteName: "Watchflicks",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchflicks - Stream Movies & TV Shows",
    description: "Your premium streaming platform for movies and TV shows",
    creator: "@watchflicks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load GA4 script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XNTNX3Z4TL"
          strategy="afterInteractive"
        />
        {/* Initialize GA4 */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XNTNX3Z4TL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <MobileAppBanner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
