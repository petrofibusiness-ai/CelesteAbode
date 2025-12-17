"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ReadMoreProps {
  children: React.ReactNode;
  maxLines?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
  showButton?: boolean;
}

export function ReadMore({
  children,
  maxLines = 3,
  className = "",
  readMoreText = "Read More",
  readLessText = "Read Less",
  showButton = true,
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        // First, measure the content without line clamp
        const originalStyle = {
          display: contentRef.current.style.display,
          webkitLineClamp: contentRef.current.style.webkitLineClamp,
          webkitBoxOrient: contentRef.current.style.webkitBoxOrient,
          maxHeight: contentRef.current.style.maxHeight,
        };

        // Temporarily remove line clamp to measure full height
        contentRef.current.style.display = "block";
        contentRef.current.style.webkitLineClamp = "none";
        contentRef.current.style.webkitBoxOrient = "unset";
        contentRef.current.style.maxHeight = "none";
        
        const fullHeight = contentRef.current.scrollHeight;
        const lineHeight = parseFloat(
          window.getComputedStyle(contentRef.current).lineHeight
        ) || 24;
        const maxHeight = lineHeight * maxLines;
        
        // Restore original styles
        contentRef.current.style.display = originalStyle.display;
        contentRef.current.style.webkitLineClamp = originalStyle.webkitLineClamp;
        contentRef.current.style.webkitBoxOrient = originalStyle.webkitBoxOrient;
        contentRef.current.style.maxHeight = originalStyle.maxHeight;
        
        setNeedsTruncation(fullHeight > maxHeight);
      }
    };

    // Use multiple timeouts to ensure DOM is ready
    const timeoutId1 = setTimeout(checkTruncation, 50);
    const timeoutId2 = setTimeout(checkTruncation, 200);
    const timeoutId3 = setTimeout(checkTruncation, 500);
    window.addEventListener('resize', checkTruncation);
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [maxLines, children]);

  return (
    <div className={className} ref={wrapperRef}>
      <div
        ref={contentRef}
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "" : "overflow-hidden"
        }`}
        style={{
          maxHeight: isExpanded ? "none" : `${maxLines * 1.8}em`,
          display: isExpanded ? "block" : "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : maxLines,
          WebkitBoxOrient: isExpanded ? "unset" : "vertical",
          textOverflow: isExpanded ? "clip" : "ellipsis",
        }}
      >
        {children}
      </div>
      {(needsTruncation || isExpanded) && showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center gap-2 text-[#CBB27A] hover:text-[#B8A066] active:text-[#A68F55] font-semibold text-sm transition-all duration-200 group touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/50 focus:ring-offset-2 rounded-md px-2 py-1"
          aria-label={isExpanded ? readLessText : readMoreText}
        >
          <span>{isExpanded ? readLessText : readMoreText}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          )}
        </button>
      )}
    </div>
  );
}

