"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadProgressOverlayProps {
  isOpen: boolean;
  progress: number; // 0-100
  status: "uploading" | "processing" | "success" | "error";
  statusText?: string;
  errorMessage?: string;
  onClose?: () => void;
}

export function UploadProgressOverlay({
  isOpen,
  progress,
  status,
  statusText,
  errorMessage,
  onClose,
}: UploadProgressOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle entrance animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-close on success after delay
  useEffect(() => {
    if (status === "success" && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!isMounted) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      case "processing":
        return <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin" />;
      default:
        return <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin" />;
    }
  };

  const getStatusText = () => {
    if (statusText) return statusText;
    switch (status) {
      case "uploading":
        return "Uploading assets...";
      case "processing":
        return "Processing...";
      case "success":
        return "Upload complete!";
      case "error":
        return "Upload failed";
      default:
        return "Processing...";
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-black/20"
        style={{ backdropFilter: "blur(12px) saturate(180%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full transform transition-all duration-300",
            isVisible
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-4"
          )}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          {/* Status text */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
            {getStatusText()}
          </h3>

          {/* Progress bar (only show for uploading/processing) */}
          {(status === "uploading" || status === "processing") && (
            <div className="space-y-3 mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 text-center font-medium">
                {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Error message */}
          {status === "error" && errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 text-center">{errorMessage}</p>
            </div>
          )}

          {/* Close button for error state */}
          {status === "error" && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

