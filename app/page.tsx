"use client";

import React, { useState, useEffect } from "react";
// 引入刚刚你复制进来的底层组件
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <WebcamPixelGrid
          gridCols={isMobile ? 30 : 60}
          gridRows={isMobile ? 45 : 40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="webcam"
          backgroundColor="#030303"
          mirror={true}
          gapRatio={0.05}
          invertColors={false}
          darken={0.6}
          borderColor="#ffffff"
          borderOpacity={0.06}
          className="w-full h-full object-cover"
          onWebcamReady={() => console.log("Webcam ready!")}
          onWebcamError={(err) => console.error("Webcam error:", err)} 
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
            Hello World &rarr;
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
            Hi, I'm Yanzisheng.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 sm:text-xl">
            Information Security | Tech Explorer <br className="hidden sm:block" />
            构建理性、安全与美感并存的数字空间。
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-medium text-black transition-all hover:bg-white/90 hover:scale-105">
              Explore My Work
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30">
              Read My Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}