"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { 
  Package, 
  Tags, 
  MessageCircle, 
  Bell, 
  UserCircle, 
  Bot, 
  MoreVertical,
  Plus,
  Send,
  User,
  ShoppingBag,
  Truck,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Live Chat State
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'user', text: 'Hi, where is my order?' }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([]);
  const [notifCount, setNotifCount] = useState(0);

  // Handoff State
  const [isHuman, setIsHuman] = useState(false);

  // Product State
  const [products, setProducts] = useState([1, 2, 3]);

  // Delivery State
  const [deliveryStatus, setDeliveryStatus] = useState(0); // 0: Processing, 1: Dispatched, 2: Delivered

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      // Mapped 0-1 to 0-4
      const index = Math.min(4, Math.floor(latest * 5.01)); 
      if (activeFeature !== index) {
        setActiveFeature(index);
      }
    }
  });



  useEffect(() => {
    // Chat Animation Loop
    if (activeFeature === 1) {
      setTimeout(() => setMessages([{ sender: 'user', text: 'Hi, where is my order?' }]), 0);
      const t1 = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Let me check that for you! Can I have your order ID?' }]);
      }, 1500);
      const t2 = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'user', text: 'It is #4092' }]);
      }, 3500);
      const t3 = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks! Your order is currently out for delivery.' }]);
      }, 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
    
    // Notifications Loop
    if (activeFeature === 2) {
      setTimeout(() => {
        setNotifications([]);
        setNotifCount(0);
      }, 0);
      const t1 = setTimeout(() => {
        setNotifications([{ id: 1, text: 'New WhatsApp Message from Sarah' }]);
        setNotifCount(1);
      }, 1000);
      const t2 = setTimeout(() => {
        setNotifications(prev => [...prev, { id: 2, text: 'Payment received for Order #9281' }]);
        setNotifCount(2);
      }, 3000);
      const t3 = setTimeout(() => {
        setNotifications(prev => [...prev, { id: 3, text: 'Instagram DM: "Do you have size M?"' }]);
        setNotifCount(3);
      }, 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }

    // Handoff Loop
    if (activeFeature === 3) {
      setTimeout(() => setIsHuman(false), 0);
      const t1 = setTimeout(() => setIsHuman(true), 3000);
      return () => clearTimeout(t1);
    }

    // Product Loop
    if (activeFeature === 0) {
      setTimeout(() => setProducts([1, 2, 3]), 0);
      const t1 = setTimeout(() => setProducts([1, 2, 3, 4]), 2000);
      return () => clearTimeout(t1);
    }

    // Delivery Loop
    if (activeFeature === 4) {
      setTimeout(() => setDeliveryStatus(0), 0);
      const t1 = setTimeout(() => setDeliveryStatus(1), 2000);
      const t2 = setTimeout(() => setDeliveryStatus(2), 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [activeFeature]);

  const features = [
    {
      id: 0,
      title: "Product & Category Management",
      description: "Easily sync and manage your e-commerce catalog. Add categories, update inventory, and push changes to the AI instantly.",
      icon: <Package className="w-6 h-6" />
    },
    {
      id: 1,
      title: "Live Chat View",
      description: "Monitor AI conversations in real-time. Jump into the chat whenever necessary to provide a personal touch.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Live Message Notifications",
      description: "Never miss a lead. Get instant push notifications and dashboard alerts the moment a customer reaches out across any channel.",
      icon: <Bell className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Order & Human Handoff",
      description: "When the AI hits its limit or a customer requests human help, seamlessly escalate the chat with full context intact.",
      icon: <UserCircle className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Logistics & Delivery Integration",
      description: "Automatically route orders to fulfillment partners like NCM and PickNDrop. Keep customers updated with real-time tracking.",
      icon: <Truck className="w-6 h-6" />
    }
  ];

  return (
    <div ref={targetRef} className="h-[400vh] lg:h-auto relative w-full">
      <div className="sticky top-20 pt-4 lg:pt-0 lg:static flex flex-col lg:flex-row gap-6 lg:gap-12 items-start h-[calc(100vh-5rem)] lg:h-auto overflow-hidden lg:overflow-visible">
        
        {/* Mobile Horizontal Sliding Row (Scroll Hijack) */}
        <div className="lg:hidden w-full overflow-hidden shrink-0">
          <motion.div style={{ x }} className="flex w-[500%]">
            {features.map((feature, idx) => (
              <div key={feature.id} className="w-1/5 px-2">
                <div className={`transition-all duration-300 p-4 rounded-2xl border flex items-center gap-4 ${
                  activeFeature === idx 
                    ? 'bg-white border-purple-500 shadow-lg shadow-purple-500/10 scale-100 opacity-100' 
                    : 'glass-panel border-slate-200 scale-95 opacity-50'
                }`}>
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${
                    activeFeature === idx ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-sm font-bold leading-tight ${activeFeature === idx ? 'text-slate-900' : 'text-slate-700'}`}>
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Vertical Scroll-Spy List */}
        <div className="hidden lg:flex w-full lg:w-1/3 flex-col gap-3 lg:gap-4 pb-4 lg:pb-0">
          {features.map((feature, idx) => (
          <motion.button
            key={feature.id}
            onViewportEnter={() => setActiveFeature(idx)}
            viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
            onClick={() => setActiveFeature(idx)}
            className={`flex-shrink-0 w-[240px] lg:w-full lg:min-h-[40vh] text-left p-4 lg:p-6 rounded-2xl transition-all duration-500 border flex flex-col lg:flex-row items-start gap-4 lg:gap-0 snap-center lg:snap-start lg:justify-center ${
              activeFeature === idx 
                ? 'bg-white border-purple-500/50 shadow-lg shadow-purple-500/10 scale-100 opacity-100 z-10 relative' 
                : 'glass-panel border-slate-200 scale-95 opacity-40 hover:opacity-70'
            }`}
          >
            <div className={`w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-xl flex items-center justify-center lg:mb-4 transition-colors shadow-sm ${
              activeFeature === idx ? 'bg-purple-600 text-white shadow-purple-500/30' : 'bg-slate-100 text-slate-500'
            }`}>
              <div className="transform scale-75 lg:scale-100">{feature.icon}</div>
            </div>
            <div className="flex-1">
              <h3 className={`text-sm lg:text-xl font-bold lg:mb-2 leading-tight ${activeFeature === idx ? 'text-slate-900' : 'text-slate-700'}`}>
                {feature.title}
              </h3>
              <p className={`hidden lg:block text-sm leading-relaxed ${activeFeature === idx ? 'text-slate-600' : 'text-slate-500'}`}>
                {feature.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Interactive UI Mockup Area */}
      <div className="w-full lg:w-2/3 relative flex-1 min-h-[400px] lg:h-[500px] rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 lg:sticky lg:top-32 transition-all duration-500">
        
        {/* Mockup Top Bar */}
        <div className="h-14 border-b border-slate-100 flex items-center px-6 justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <Bot className="w-4 h-4" /> Botifyme Dashboard
          </div>
        </div>

        {/* Feature 0: Products */}
        <div className={`absolute inset-0 top-14 p-4 lg:p-8 transition-opacity duration-500 overflow-y-auto bg-slate-50/50 ${activeFeature === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <motion.div animate={{ opacity: activeFeature === 0 ? 1 : 0, y: activeFeature === 0 ? 0 : 20 }} transition={{ duration: 0.4 }} className="flex justify-between items-center mb-6">
            <h4 className="text-lg lg:text-xl font-bold text-slate-900">Product Catalog</h4>
            <div className="flex gap-2">
              <button className="bg-white border border-slate-200 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                <Tags className="w-4 h-4" /> <span className="hidden sm:inline">Categories</span>
              </button>
              <button className="bg-purple-600 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm text-white flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <motion.div key={i} animate={{ opacity: activeFeature === 0 ? 1 : 0, scale: activeFeature === 0 ? 1 : 0.9 }} transition={{ duration: 0.3, delay: i * 0.1 }} className="bg-white border border-slate-100 p-4 rounded-xl relative group hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-full aspect-square bg-slate-50 rounded-lg mb-3 flex items-center justify-center border border-slate-100">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <div className="h-3 w-3/4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-purple-200 rounded"></div>
                
                {/* Hover actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white shadow-sm border border-slate-100 p-1 rounded text-slate-600 hover:text-purple-600 transition-colors cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature 1: Live Chat */}
        <div className={`absolute inset-0 top-14 flex flex-col transition-opacity duration-500 bg-white ${activeFeature === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-4 flex flex-col justify-end pb-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <motion.div key={i} animate={{ opacity: activeFeature === 1 ? 1 : 0, y: activeFeature === 1 ? 0 : 20 }} transition={{ duration: 0.3, delay: i * 0.15 }} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[75%] text-xs lg:text-sm shadow-sm border ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-sm border-purple-600' : 'bg-white text-slate-700 rounded-bl-sm border-slate-200'}`}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div animate={{ opacity: activeFeature === 1 ? 1 : 0, y: activeFeature === 1 ? 0 : 20 }} transition={{ delay: 0.5 }} className="p-4 border-t border-slate-200 bg-white flex gap-2">
            <div className="h-10 flex-1 bg-slate-50 rounded-lg border border-slate-200 px-4 flex items-center text-slate-400 text-sm">Type a message...</div>
            <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Feature 2: Notifications */}
        <div className={`absolute inset-0 top-14 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-slate-50 to-slate-50 ${activeFeature === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <div className="absolute top-4 right-6 flex items-center gap-4">
            <div className="relative">
              <Bell className={`w-6 h-6 text-slate-500 transition-all duration-300 ${notifCount > 0 ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''}`} />
              {notifCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold animate-pulse shadow-sm">
                  {notifCount}
                </div>
              )}
            </div>
            <div className="w-8 h-8 bg-slate-200 border border-slate-300 rounded-full"></div>
          </div>

          <div className="absolute top-16 right-4 lg:right-6 w-[280px] lg:w-80 space-y-3">
            {notifications.map((notif, i) => (
              <motion.div key={notif.id} animate={{ opacity: activeFeature === 2 ? 1 : 0, x: activeFeature === 2 ? 0 : 50 }} transition={{ duration: 0.4, delay: i * 0.15 }} className="bg-white p-4 rounded-xl border border-purple-100 flex items-start gap-3 shadow-lg shadow-purple-500/5">
                <div className="bg-purple-100 p-2 rounded-full mt-0.5 shrink-0">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-slate-900 font-medium">{notif.text}</p>
                  <p className="text-[10px] lg:text-xs text-slate-500 mt-1">Just now</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature 3: Handoff */}
        <div className={`absolute inset-0 top-14 flex items-center justify-center transition-opacity duration-500 p-4 bg-slate-50/80 ${activeFeature === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <motion.div animate={{ opacity: activeFeature === 3 ? 1 : 0, scale: activeFeature === 3 ? 1 : 0.95 }} transition={{ duration: 0.4 }} className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-4 lg:p-6 relative overflow-hidden shadow-xl shadow-slate-200">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-700 ${isHuman ? 'bg-green-500' : 'bg-purple-600'}`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-bold text-sm lg:text-base">Customer #829</h5>
                    <p className="text-[10px] lg:text-xs text-slate-500">Viewing: Shoes Category</p>
                  </div>
                </div>
                
                <div className={`px-2 py-1 lg:px-3 lg:py-1 rounded-full text-[10px] lg:text-xs font-bold border transition-all duration-500 flex items-center gap-1 ${
                  isHuman ? 'bg-green-100 text-green-700 border-green-200' : 'bg-purple-100 text-purple-700 border-purple-200'
                }`}>
                  {isHuman ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {isHuman ? 'Human Agent' : 'AI Handling'}
                </div>
              </div>

              <motion.div animate={{ y: activeFeature === 3 ? 0 : 20, opacity: activeFeature === 3 ? 1 : 0 }} transition={{ delay: 0.2 }} className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6 shadow-inner">
                <p className="text-xs lg:text-sm text-slate-700 mb-2">&quot;I need help choosing a size, these run small?&quot;</p>
                <p className="text-[10px] lg:text-xs text-red-500 font-medium flex items-center gap-1"><Bell className="w-3 h-3" /> Sentiment: Frustrated</p>
              </motion.div>

              <button 
                onClick={() => setIsHuman(!isHuman)}
                className={`w-full py-2.5 lg:py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                  isHuman ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300' : 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/30'
                }`}
              >
                {isHuman ? (
                  <>Return to AI Control</>
                ) : (
                  <>
                    <UserCircle className="w-5 h-5" /> Take Over Chat
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature 4: Delivery Integration */}
        <div className={`absolute inset-0 top-14 flex items-center justify-center transition-opacity duration-500 p-4 bg-slate-50/80 ${activeFeature === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <motion.div animate={{ opacity: activeFeature === 4 ? 1 : 0, y: activeFeature === 4 ? 0 : 30 }} transition={{ duration: 0.5 }} className="w-full max-w-sm bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden shadow-xl shadow-slate-200">
            {/* Map background mockup */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-6 shadow-sm">
                <MapPin className="w-3 h-3" /> NCM & PickNDrop Integration Active
              </div>
              
              <div className="relative h-2 bg-slate-100 border border-slate-200 rounded-full mb-8 overflow-hidden">
                <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000 ease-in-out ${
                  deliveryStatus === 0 ? 'w-1/3' : deliveryStatus === 1 ? 'w-2/3' : 'w-full'
                }`}></div>
              </div>
              
              <div className="flex justify-between items-center relative mb-6">
                <div className={`flex flex-col items-center transition-opacity duration-300 ${deliveryStatus >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${deliveryStatus >= 0 ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Processing</span>
                </div>
                
                <div className={`flex flex-col items-center transition-opacity duration-300 ${deliveryStatus >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${deliveryStatus >= 1 ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    <Truck className={`w-5 h-5 ${deliveryStatus === 1 ? 'animate-bounce' : ''}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Dispatched</span>
                </div>
                
                <div className={`flex flex-col items-center transition-opacity duration-300 ${deliveryStatus >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${deliveryStatus >= 2 ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Delivered</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-left flex items-start gap-3 shadow-inner">
                <Bot className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-900 font-medium">Automated SMS sent to customer:</p>
                  <p className="text-xs text-slate-600 mt-1">&quot;Your order #8292 has been {deliveryStatus === 0 ? 'processed' : deliveryStatus === 1 ? 'dispatched via NCM/PickNDrop' : 'delivered'}. Track here: link.com&quot;</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
    </div>
  );
}
