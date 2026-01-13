"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        setIsMobile(true);
      }
    };
    checkMobile();
  }, []);

  if (!isVisible || !isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border px-4 py-3 shadow-lg animate-in slide-in-from-bottom">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="text-xl">🍿</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Watchflicks App</span>
            <span className="text-xs text-muted-foreground">
              Better experience on mobile
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/popcorns-app/popcorns/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="h-8 text-xs font-bold">
              Install
            </Button>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
