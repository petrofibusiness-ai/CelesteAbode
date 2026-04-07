"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Building2, Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const SUPPORT_ADMIN_EMAIL = "support@celesteabode.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      const email = (data?.user?.email || "").toString().toLowerCase();
      const target = email === SUPPORT_ADMIN_EMAIL ? "/admin" : "/admin/leads";
      router.push(target);
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-36 md:pt-44 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-200/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#CBB27A]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              {/* Logo/Header */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-2xl mb-4 shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Admin Panel
                </h1>
                <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Celeste Abode Property Management
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Login ID
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#CBB27A] transition-colors" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 rounded-xl transition-all"
                      required
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#CBB27A] transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 rounded-xl transition-all"
                      required
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#CBB27A] to-[#B8A068] hover:from-[#B8A068] hover:to-[#A68F5B] text-white font-semibold py-6 rounded-xl transition-all duration-300 text-base shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

