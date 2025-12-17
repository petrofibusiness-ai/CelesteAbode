"use client";

import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Always visible */}
      <Header />
      
      {/* Main content area with loading state */}
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-4 sm:space-y-6 w-full max-w-md"
          >
            {/* Loading spinner */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
              >
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#CBB27A]" strokeWidth={2.5} />
              </motion.div>
              
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#CBB27A]/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            {/* Loading text */}
            <div className="space-y-1.5 sm:space-y-2 px-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg font-semibold text-primary"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Loading...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm text-muted-foreground"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Please wait while we prepare your content
              </motion.p>
            </div>
            
            {/* Loading dots animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#CBB27A]"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
