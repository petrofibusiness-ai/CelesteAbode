"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header alwaysBlack />
      <div className="flex items-center justify-center px-4 sm:px-6 relative py-8 sm:py-12" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBB27A]/5"></div>
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#CBB27A]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8 relative z-10 flex flex-col items-center justify-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#CBB27A]/10 mb-4 sm:mb-6">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#CBB27A]" />
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
            404
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 w-full px-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#000000] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] text-sm sm:text-base w-full sm:w-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Home
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#000000] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] text-sm sm:text-base w-full sm:w-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Browse Properties
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
      </div>
    </div>
  );
}
