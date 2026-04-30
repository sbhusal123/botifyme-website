"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  MessageCircle,
  Globe,
  ArrowRight,
  Sparkles,
  BotMessageSquare,
  Smartphone,
  CheckCircle2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import FeatureShowcase from "@/components/FeatureShowcase";
import HeroAnimation from "@/components/HeroAnimation";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import TrialModal from "@/components/TrialModal";
import { Variants } from "framer-motion";
import { MotionDiv, MotionSection } from "@/components/Motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Botifyme',
    operatingSystem: 'Any',
    applicationCategory: 'BusinessApplication',
    description: 'The ultimate all-in-one e-commerce SaaS. Launch a free storefront with a built-in AI assistant and seamless delivery integration to automate your sales.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'Botifyme',
      url: 'https://botifyme.tech'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-purple-500/30 text-slate-900 overflow-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden px-4 sm:px-6">
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-purple-600/10 rounded-full blur-[100px] md:blur-[120px] opacity-70 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px] opacity-50 pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <MotionDiv
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel border border-purple-500/30 text-purple-700 text-xs md:text-sm font-medium mb-6 md:mb-8 bg-purple-50/50">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  <span>The future of e-commerce support is here</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight lg:leading-[1.1] text-slate-900">
                  Automate Sales with your own <br className="hidden sm:block" />
                  <span className="text-gradient">Store Ecommerce Site.</span>
                </h1>

                <p className="text-slate-600 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Connect your e-commerce store with an AI sales agent that handles queries on Facebook, WhatsApp, Instagram, and your Website instantly. Turn conversations into conversions 24/7.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => setIsTrialModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                  >
                    Start your 10 days trial
                  </button>
                  <a 
                    href="https://test.botifyme.tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-full hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    View Live Demo <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-4 text-[10px] md:text-xs text-slate-400 lg:text-left text-center italic">
                  * For admin credentials and login, please contact us for demo usage.
                </p>

                <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-xs md:text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                    Setup in 5 minutes
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                className="flex-1 relative w-full max-w-lg lg:max-w-none mt-10 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <HeroAnimation />
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Integrations Marquee Section */}
        <section id="integrations" className="py-8 md:py-10 border-y border-slate-200 bg-white/50 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:pause">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-10 md:gap-16 px-4 md:px-8">
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-blue-600 transition-colors"><FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /><span className="text-base sm:text-lg md:text-xl font-bold tracking-wider">Facebook</span></div>
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-green-600 transition-colors"><MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /><span className="text-base sm:text-lg md:text-xl font-bold tracking-wider">WhatsApp</span></div>
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-pink-600 transition-colors"><FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /><span className="text-base sm:text-lg md:text-xl font-bold tracking-wider">Instagram</span></div>
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-cyan-600 transition-colors"><Globe className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /><span className="text-base sm:text-lg md:text-xl font-bold tracking-wider">Web Store</span></div>
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-purple-600 transition-colors"><Smartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /><span className="text-base sm:text-lg md:text-xl font-bold tracking-wider">Mobile App</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Showcase Section */}
        <MotionSection
          id="features"
          className="py-20 md:py-32 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-slate-900">Everything you need to <span className="text-gradient">scale support</span></h2>
              <p className="text-slate-600 text-base md:text-lg">Stop losing customers to slow response times. Our AI agent integrates directly with your product catalog to answer questions, recommend items, and close sales automatically.</p>
            </div>

            <FeatureShowcase />
          </div>
        </MotionSection>

        {/* How It Works */}
        <MotionSection
          id="how-it-works"
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-transparent to-purple-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-slate-900">Setup in minutes, <br className="hidden sm:block" />sell for <span className="text-gradient">years.</span></h2>
                <p className="text-slate-600 text-base md:text-lg mb-10 md:mb-12">We&apos;ve eliminated the complex onboarding process. Start automating your e-commerce conversations today.</p>

                <MotionDiv
                  className="space-y-6 md:space-y-8 text-left"
                  variants={staggerContainer}
                >
                  {[
                    { step: "01", title: "Connect your channels", desc: "Link your Facebook, Instagram, and WhatsApp Business accounts with one click." },
                    { step: "02", title: "Sync your catalog", desc: "Import your e-commerce products so the AI knows exactly what you sell." },
                    { step: "03", title: "Flip the switch", desc: "Activate the AI agent. Watch it handle inquiries and close sales automatically." }
                  ].map((item, idx) => (
                    <MotionDiv key={idx} className="flex gap-4 md:gap-6" variants={fadeUpVariant}>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold border border-purple-200">
                          {item.step}
                        </div>
                        {idx !== 2 && <div className="w-px h-full bg-gradient-to-b from-purple-200 to-transparent my-2"></div>}
                      </div>
                      <div className="pb-6 md:pb-8">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{item.title}</h3>
                        <p className="text-sm md:text-base text-slate-600">{item.desc}</p>
                      </div>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              </div>
              <div className="flex-1 w-full max-w-lg mx-auto relative mt-10 lg:mt-0">
                {/* Decorative glowing sphere */}
                <div className="absolute inset-0 bg-purple-500/10 blur-[80px] md:blur-[100px] rounded-full"></div>
                <div className="relative glass-panel bg-white/80 rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xl shadow-slate-200/50">
                  <div className="space-y-4">
                    {/* Simulated Chat Interface */}
                    <MotionDiv className="flex gap-3 md:gap-4 items-end" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 shrink-0"></div>
                      <div className="bg-slate-100 border border-slate-200 py-2 px-3 md:py-3 md:px-4 rounded-2xl rounded-bl-none max-w-[85%] md:max-w-[80%]">
                        <p className="text-xs md:text-sm text-slate-700">Do you have the black sneakers in size 10?</p>
                      </div>
                    </MotionDiv>
                    <MotionDiv className="flex gap-3 md:gap-4 items-end flex-row-reverse" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 shrink-0 flex items-center justify-center">
                        <BotMessageSquare className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="bg-purple-600 py-2 px-3 md:py-3 md:px-4 rounded-2xl rounded-br-none max-w-[85%] md:max-w-[80%]">
                        <p className="text-xs md:text-sm text-white">Yes! The Stealth Black Sneakers in size 10 are in stock. They cost $120. Would you like me to send you the checkout link?</p>
                      </div>
                    </MotionDiv>
                    <MotionDiv className="flex gap-3 md:gap-4 items-end" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 shrink-0"></div>
                      <div className="bg-slate-100 border border-slate-200 py-2 px-3 md:py-3 md:px-4 rounded-2xl rounded-bl-none max-w-[85%] md:max-w-[80%]">
                        <p className="text-xs md:text-sm text-slate-700">Yes please!</p>
                      </div>
                    </MotionDiv>
                    <MotionDiv className="flex gap-3 md:gap-4 items-end flex-row-reverse" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 shrink-0 flex items-center justify-center">
                        <BotMessageSquare className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="bg-purple-600 py-2 px-3 md:py-3 md:px-4 rounded-2xl rounded-br-none max-w-[85%] md:max-w-[80%]">
                        <p className="text-xs md:text-sm text-white">Here is your secure checkout link: <span className="underline opacity-80 cursor-pointer">pay.store.com/ck123</span>. The item will be reserved for 15 minutes.</p>
                      </div>
                    </MotionDiv>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Pricing Section */}
        <MotionSection
          id="pricing"
          className="py-16 sm:py-20 md:py-24 relative bg-white border-y border-slate-200 px-4 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-6 relative z-10">
            <MotionDiv className="text-center max-w-3xl mx-auto mb-12 md:mb-16" variants={fadeUpVariant}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Simple, transparent <span className="text-gradient">pricing</span></h2>
              <p className="text-slate-600 text-base md:text-lg">Choose the perfect plan based on your product volume and support needs.</p>
            </MotionDiv>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-center">
              {/* Starter Tier */}
              <MotionDiv variants={fadeUpVariant} className="glass-panel bg-gradient-to-b from-white to-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                  <p className="text-slate-500 text-xs md:text-sm mb-6">Perfect for small stores just starting out.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">Rs 3,000</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <a href="https://ig.me/m/tekkops555" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-center text-slate-900 font-medium transition-colors mb-8 text-sm md:text-base">
                    Start your 10 days trial
                  </a>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>20</strong> AI Synced Products</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>10,000</strong> Total Messages /mo</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>3,000</strong> AI Replies /mo</span>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Pro Tier */}
              <MotionDiv variants={fadeUpVariant} className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-300 bg-gradient-to-b from-purple-50 to-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)] transition-all duration-300 relative transform md:-translate-y-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    MOST POPULAR
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
                  <p className="text-slate-600 text-xs md:text-sm mb-6">For growing brands scaling their support.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">Rs 5,000</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <a href="https://ig.me/m/tekkops555" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-center text-white font-bold transition-colors mb-8 shadow-lg shadow-purple-600/30 text-sm md:text-base">
                    Start your 10 days trial
                  </a>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-700 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-600 shrink-0" />
                      <span>Up to <strong>50</strong> Products Synced</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-600 shrink-0" />
                      <span><strong>20,000</strong> Total Messages /mo</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-600 shrink-0" />
                      <span><strong>5,000</strong> AI Replies /mo</span>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Scale Tier */}
              <MotionDiv variants={fadeUpVariant} className="glass-panel bg-gradient-to-b from-white to-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Scale</h3>
                  <p className="text-slate-500 text-xs md:text-sm mb-6">For high-volume enterprise e-commerce.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">Rs 10,000</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <a href="https://ig.me/m/tekkops555" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-center text-slate-900 font-medium transition-colors mb-8 text-sm md:text-base">
                    Contact Sales
                  </a>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>100</strong> Products Synced</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>100,000</strong> Total Messages /mo</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
                      <span><strong>10,000</strong> AI Replies /mo</span>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </MotionSection>

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Form Section */}
        <section id="contact" className="py-16 sm:py-20 md:py-24 relative px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto relative z-10">
            <ContactForm />
          </div>
        </section>

        {/* Site Contact Details Section */}
        <MotionSection 
          id="site-contact" 
          className="py-16 sm:py-20 md:py-32 bg-slate-50 relative overflow-hidden px-4 sm:px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-[100px] -ml-32 -mb-32 opacity-60"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" />
                Connect Directly
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Site Contact Details</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">Skip the form and reach out to us instantly through our social and messaging platforms.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Facebook Card */}
              <MotionDiv 
                whileHover={{ y: -10 }}
                className="p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-center group transition-all"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FaFacebook className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Facebook</h3>
                <p className="text-slate-600 mb-8">Join 1,000+ brands in our growing Facebook community.</p>
                <a 
                  href="https://www.facebook.com/tekkops.technologies5555" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                >
                  Visit Page <ArrowRight className="w-4 h-4" />
                </a>
              </MotionDiv>

              {/* Instagram Card */}
              <MotionDiv 
                whileHover={{ y: -10 }}
                className="p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-center group transition-all"
              >
                <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <FaInstagram className="w-10 h-10 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Instagram</h3>
                <p className="text-slate-600 mb-8">See our latest automation features and client success stories.</p>
                <a 
                  href="https://www.instagram.com/tekkops555/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-pink-600 font-bold hover:gap-3 transition-all"
                >
                  Follow Us <ArrowRight className="w-4 h-4" />
                </a>
              </MotionDiv>

              {/* WhatsApp Card */}
              <MotionDiv 
                whileHover={{ y: -10 }}
                className="p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-center group transition-all"
              >
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FaWhatsapp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">WhatsApp</h3>
                <p className="text-slate-600 mb-8">Chat with our dedicated support team 24/7 for instant help.</p>
                <a 
                  href="https://wa.me/9779861155894" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
                >
                  Message Us <ArrowRight className="w-4 h-4" />
                </a>
              </MotionDiv>
            </div>
          </div>
        </MotionSection>

        {/* CTA Section */}
        <MotionSection
          className="py-16 sm:py-20 md:py-32 relative px-4 sm:px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="glass-panel bg-white/90 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 text-center relative overflow-hidden border-slate-200 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-cyan-100 opacity-50"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-slate-900">Ready to automate your e-commerce growth?</h2>
                <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-10">Join 1,000+ brands using Botifyme to scale their customer support and increase sales through automated chat.</p>
                <button 
                  onClick={() => setIsTrialModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 text-base md:text-lg shadow-lg"
                >
                  Start your 10 days trial <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <p className="mt-6 text-xs md:text-sm text-slate-500">No credit card required. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
      <TrialModal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} />
    </div>
  );
}
