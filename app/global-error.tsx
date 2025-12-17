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
          <div className="flex items-center justify-center px-4 relative" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBB27A]/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#CBB27A]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="max-w-2xl w-full text-center space-y-8 relative z-10 flex flex-col items-center justify-center">
            {/* Animated Error Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-8xl md:text-9xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Error
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent mx-auto"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Critical Error
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                A critical error occurred. Please refresh the page or contact support if the problem persists.
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#000000] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] text-base"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                  <ArrowRight className="w-4 h-4" />
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

