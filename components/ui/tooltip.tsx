"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, // 10px above the element
        left: rect.left + rect.width / 2,
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{ top: position.top, left: position.left }}
          >
            <div className="bg-black/90 text-white text-xs rounded py-2 px-3 shadow-xl border border-white/10 backdrop-blur-sm whitespace-nowrap">
              {content}
            </div>
            {/* Arrow */}
            <div className="w-2 h-2 bg-black/90 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10"></div>
          </div>,
          document.body
        )}
    </div>
  );
}
