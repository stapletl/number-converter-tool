import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://number-converter-tool.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Number Converter – Binary, Octal, Decimal & Hex",
  description:
    "Instantly convert numbers between binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and any custom base from 2 to 64. Free, real-time tool.",
  keywords: [
    "number converter",
    "binary converter",
    "hex converter",
    "octal converter",
    "decimal converter",
    "base conversion",
    "numeral system",
    "custom base",
  ],
  openGraph: {
    title: "Number Converter – Binary, Octal, Decimal & Hex",
    description:
      "Instantly convert numbers between binary, octal, decimal, hexadecimal, and any custom base (2–64). Free, real-time tool.",
    url: BASE_URL,
    siteName: "Number Converter",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Number Converter – Binary, Octal, Decimal & Hex",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Converter – Binary, Octal, Decimal & Hex",
    description:
      "Instantly convert numbers between binary, octal, decimal, hexadecimal, and any custom base (2–64). Free, real-time tool.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Number Converter",
  url: BASE_URL,
  description:
    "Real-time number base conversion tool supporting binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and any custom base from 2 to 64.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Binary (base 2) conversion",
    "Octal (base 8) conversion",
    "Decimal (base 10) conversion",
    "Hexadecimal (base 16) conversion",
    "Custom base conversion (base 2–64)",
    "Real-time conversion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <div className="absolute top-4 right-4 z-10">
            <AnimatedThemeToggler />
          </div>
          {children}
          <Toaster richColors={true} position="top-center" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
