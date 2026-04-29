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
  metadataBase: new URL('https://botifyme.com'),
  title: "Botifyme | AI Chatbot & WhatsApp Automation in Nepal",
  description: "Automate your e-commerce sales and customer support with Botifyme's AI agent across WhatsApp, Instagram, and Messenger in Nepal. Connect with NCM & PickNDrop.",
  keywords: [
    "WhatsApp automation Nepal",
    "AI Chatbot for e-commerce Nepal",
    "WhatsApp Business API Nepal",
    "Automated Customer Support Nepal",
    "E-commerce CRM integration Nepal",
    "Botifyme",
    "Instagram DM automation"
  ],
  openGraph: {
    title: "Botifyme | AI E-Commerce Automation in Nepal",
    description: "Automate your e-commerce sales and customer support with Botifyme's AI agent.",
    url: 'https://botifyme.com',
    siteName: 'Botifyme',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Botifyme | AI E-Commerce Automation in Nepal",
    description: "Automate your e-commerce sales and customer support with Botifyme's AI agent.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://botifyme.com',
  }
};

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
