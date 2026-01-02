"use client";

import { motion } from "framer-motion";
import { RefreshCw, ArrowRight, AlertTriangle } from "lucide-react";
import { Header } from "@/components/header";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="min-h-screen bg-background relative overflow-hidden">
          <Header />
          <div className="flex items-center justify-center px-4 sm:px-6 relative py-8 sm:py-12 md:py-16" style={{ minHeight: 'calc(100vh - 100px)', paddingTop: '100px' }}>
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBB27A]/5"></div>
          <div className="absolute top-24 left-4 sm:top-32 sm:left-10 md:top-40 w-48 h-48 sm:w-72 sm:h-72 bg-[#CBB27A]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="max-w-xl md:max-w-2xl w-full text-center space-y-4 sm:space-y-6 md:space-y-8 relative z-10 flex flex-col items-center justify-center">
            {/* Animated Error Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-red-500/10 mb-3 sm:mb-4 md:mb-6">
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-500" />
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Error
              </h1>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent mx-auto"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 sm:space-y-4 px-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Critical Error
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                A critical error occurred. Please refresh the page or contact support if the problem persists.
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center pt-2 sm:pt-4 w-full px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#000000] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] text-sm sm:text-base w-full sm:w-auto"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Try Again
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </motion.div>
            </motion.div>

          </div>
          </div>
        </div>
      </body>
    </html>
  );
}

