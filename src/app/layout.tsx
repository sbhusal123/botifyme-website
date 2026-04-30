import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://botifyme.tech'),
  title: "Botifyme | All-in-One AI Storefront, Chatbot & Delivery SaaS",
  description: "Launch a free e-commerce storefront with a built-in AI assistant and seamless delivery integration. The ultimate all-in-one SaaS platform to automate your sales.",
  keywords: [
    "All-in-one e-commerce SaaS",
    "AI-powered storefront builder",
    "Online store with built-in delivery",
    "SaaS platform with AI sales assistant",
    "free ecommerce site with ai sales agent",
    "Free e-commerce storefront",
    "Shopify alternative",
    "Omnichannel AI Chatbot",
    "WhatsApp Business API Integration",
    "Botifyme"
  ],
  openGraph: {
    title: "Botifyme | All-in-One AI Storefront, Chatbot & Delivery SaaS",
    description: "Launch a free e-commerce storefront with a built-in AI assistant and seamless delivery integration. The ultimate all-in-one SaaS platform to automate your sales.",
    url: 'https://botifyme.tech',
    siteName: 'Botifyme',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Botifyme Omnichannel AI E-Commerce Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Botifyme | All-in-One AI Storefront, Chatbot & Delivery SaaS",
    description: "Launch a free e-commerce storefront with a built-in AI assistant and seamless delivery integration. The ultimate all-in-one SaaS platform to automate your sales.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://botifyme.tech',
  }
};

import SupportChat from "@/components/SupportChat";
import DemoBadge from "@/components/DemoBadge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SupportChat />
        <DemoBadge />
      </body>
    </html>
  );
}
