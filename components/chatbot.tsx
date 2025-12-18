 "use client";

 import { useState, useEffect, useRef } from "react";
 import { X, Send, MessageCircle, ChevronRight, ExternalLink } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { motion, AnimatePresence } from "framer-motion";
 import Link from "next/link";
 import { usePathname } from "next/navigation";

 interface ChatMessage {
   type: "bot" | "user";
   content: string;
   options?: string[];
   timestamp: Date;
 }

 interface ChatbotData {
   userIntent?: string;
   propertyType?: string;
   preferredLocation?: string;
   budgetRange?: string;
   bhkPreference?: string;
   commercialUse?: string;
   timeline?: string;
   leadScore?: "HOT" | "WARM" | "COLD";
   wantsVirtualTour?: boolean;
   wantsPriceComparison?: boolean;
   wantsBestProjects?: boolean;
   wantsExpertCall?: boolean;
   userName?: string;
   phoneNumber?: string;
  contactPreference?: "WhatsApp only" | "Email + WhatsApp" | "WhatsApp & Call" | "Email";
   email?: string;
 }

export function Chatbot() {
  const pathname = usePathname();
  
  // Hide chatbot on admin pages - check before hooks
  const isAdminRoute = pathname?.startsWith("/admin");

  const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [currentStep, setCurrentStep] = useState(0);
   const [data, setData] = useState<ChatbotData>({});
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [inputValue, setInputValue] = useState("");
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle input focus to scroll into view when keyboard opens
  useEffect(() => {
    if (!inputRef.current || typeof window === 'undefined') return;
    if (currentStep !== 8 && currentStep !== 9 && currentStep !== 11) return;

    const input = inputRef.current;
    const chatbotContainer = input.closest('.chatbot-container') as HTMLElement;

    const scrollInputIntoView = () => {
      // Multiple attempts to ensure it works across different devices
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }, 100);
      
      setTimeout(() => {
        if (chatbotContainer) {
          chatbotContainer.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
      }, 300);
      
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }, 500);
    };

    // Use visual viewport API if available
    if (window.visualViewport) {
      const handleResize = () => {
        scrollInputIntoView();
      };
      
      window.visualViewport.addEventListener('resize', handleResize);
      input.addEventListener('focus', scrollInputIntoView);
      
      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
        input.removeEventListener('focus', scrollInputIntoView);
      };
    } else {
      // Fallback for browsers without visual viewport API
      input.addEventListener('focus', scrollInputIntoView);
      
      return () => {
        input.removeEventListener('focus', scrollInputIntoView);
      };
    }
  }, [currentStep]);

   // Entry triggers: click (handled in UI), scroll, idle on projects pages
   useEffect(() => {
     if (typeof window === "undefined") return;

     const sessionKey = "celeste_chatbot_auto_opened";
     if (sessionStorage.getItem(sessionKey)) {
       return;
     }

      // Scroll trigger (~45% scroll depth) - Batched to avoid forced reflows
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight =
              document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const ratio = docHeight > 0 ? scrollTop / docHeight : 0;

            if (ratio >= 0.45 && !isOpen) {
              setIsOpen(true);
              sessionStorage.setItem(sessionKey, "1");
              window.removeEventListener("scroll", handleScroll);
            }
            ticking = false;
          });
          ticking = true;
        }
      };

     window.addEventListener("scroll", handleScroll, { passive: true });

     // Idle trigger on properties pages
     let idleTimeout: number | undefined;
     const isProjectsPage =
       pathname?.startsWith("/projects") || pathname === "/projects";

     if (isProjectsPage) {
       idleTimeout = window.setTimeout(() => {
         if (!isOpen) {
           setIsOpen(true);
           sessionStorage.setItem(sessionKey, "1");
         }
       }, 15000);
     }

     return () => {
       window.removeEventListener("scroll", handleScroll);
       if (idleTimeout) {
         window.clearTimeout(idleTimeout);
       }
     };
   }, [isOpen, pathname]);

   useEffect(() => {
    if (isOpen && currentStep === 0 && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I’m your Celeste Abode property advisor. I can help you find the right project for you in under 60 seconds.",
          ["✅ Yes, let’s go", "👀 Just browsing"]
        );
      }, 300);
    }
   }, [isOpen, currentStep, messages.length]);

   const addBotMessage = (content: string, options?: string[]) => {
     setMessages((prev) => [
       ...prev,
       {
         type: "bot",
         content,
         options,
         timestamp: new Date(),
       },
     ]);
   };

   const addUserMessage = (content: string) => {
     setMessages((prev) => [
       ...prev,
       {
         type: "user",
         content,
         timestamp: new Date(),
       },
     ]);
   };

   const handleOptionClick = (option: string) => {
     // Quick actions at the very end
     if (option.startsWith("🔍 View Properties")) {
       if (typeof window !== "undefined") {
         window.location.href = "/projects";
       }
       return;
     }

     if (option.startsWith("📞 Talk Now")) {
       if (typeof window !== "undefined") {
         const phoneNumber = (process.env.NEXT_PUBLIC_SALES_PHONE as string) || "+919818735258";
         window.location.href = `tel:${phoneNumber}`;
       }
       return;
     }

     addUserMessage(option);
     handleResponse(option);
   };

   const isValidPhone = (value: string) => {
     const cleaned = value.trim();
     const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
     return phoneRegex.test(cleaned);
   };

   const handleResponse = (response: string) => {
     const step = currentStep;
     let nextStep = step;
     let shouldAdvance = true;

     switch (step) {
       // 0: Greeting / entry
       case 0: {
         const normalized = response.toLowerCase();
         if (
           normalized.includes("yes") ||
           normalized.includes("go") ||
           normalized.includes("okay") ||
           normalized.includes("ok") ||
           normalized.includes("start")
         ) {
           nextStep = 1;
           setTimeout(() => {
             addBotMessage(
               "Great! First, what are you looking for today? (This helps me show only relevant options.)",
               [
                 "🏠 Buy a property",
                 "🏢 Rent a property",
                 "💼 Invest in real estate",
                 "🤝 Talk to an expert",
               ]
             );
           }, 400);
         } else {
           setTimeout(() => {
             addBotMessage(
               "No problem at all. You can keep browsing — I’ll be here if you need help finding the right property.",
               ["✅ Yes, let’s go"]
             );
           }, 400);
           shouldAdvance = false;
         }
         break;
       }

       // 1: Intent
       case 1: {
         const intent = response.includes("Buy")
           ? "Buy a property"
           : response.includes("Rent")
           ? "Rent a property"
           : response.includes("Invest")
           ? "Invest in real estate"
           : response.includes("Talk to an expert")
           ? "Talk to an expert"
           : response;

         setData((prev) => ({ ...prev, userIntent: intent }));

         if (intent === "Talk to an expert") {
           // Skip property questions → go straight to contact capture
           nextStep = 8;
           setTimeout(() => {
             addBotMessage(
               "Perfect. I’ll connect you with an expert. What should we call you?",
               []
             );
           }, 400);
         } else {
           nextStep = 2;
           setTimeout(() => {
             addBotMessage(
               "Nice. What type of property interests you? (This keeps recommendations precise.)",
               [
                 "Apartment / Flat",
                 "Villa / Independent House",
                 "Plot / Land",
                 "Commercial Property",
               ]
             );
           }, 400);
         }
         break;
       }

       // 2: Property type
       case 2: {
         setData((prev) => ({ ...prev, propertyType: response }));
         nextStep = 3;
         setTimeout(() => {
           addBotMessage(
             "Got it. Any preferred location? This helps us match projects that fit your lifestyle. 📍",
             [
               "Noida",
               "Greater Noida",
               "Greater Noida West",
               "Ghaziabad NH24",
               "Yamuna Expressway",
               "Anywhere (show best options)",
             ]
           );
         }, 400);
         break;
       }

       // 3: Location preference
       case 3: {
         setData((prev) => ({ ...prev, preferredLocation: response }));
         nextStep = 4;
         setTimeout(() => {
           addBotMessage(
             "Understood. What budget range should I keep in mind? (So you only see realistic options.)",
             [
               "Under ₹50L",
               "₹50L – ₹1 Cr",
               "₹1 Cr – ₹2 Cr",
               "₹2 Cr+",
               "Not decided yet",
             ]
           );
         }, 400);
         break;
       }

       // 4: Budget
       case 4: {
         setData((prev) => ({ ...prev, budgetRange: response }));
         nextStep = 5;

         const propertyType = data.propertyType || "";
         if (propertyType.includes("Commercial")) {
           setTimeout(() => {
             addBotMessage(
               "Almost there. What will the commercial space be used for?",
               ["Office", "Retail", "Warehouse", "Mixed-use"]
             );
           }, 400);
         } else if (propertyType.includes("Plot")) {
           // For plots, skip BHK / usage
           nextStep = 6;
           setTimeout(() => {
             addBotMessage(
               "When are you planning to move or invest? This helps us prioritise the right options for you.",
               ["Immediately", "Within 1–3 months", "3–6 months", "Just exploring"]
             );
           }, 400);
         } else {
           setTimeout(() => {
             addBotMessage(
               "Nice. For residential options, how many bedrooms are you looking for?",
               ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Flexible"]
             );
           }, 400);
         }
         break;
       }

       // 5: Property details (BHK or commercial use)
       case 5: {
         const propertyType = data.propertyType || "";

         if (propertyType.includes("Commercial")) {
           setData((prev) => ({ ...prev, commercialUse: response }));
         } else if (!propertyType.includes("Plot")) {
           setData((prev) => ({ ...prev, bhkPreference: response }));
         }

         nextStep = 6;
         setTimeout(() => {
           addBotMessage(
             "Great. When are you planning to move or invest? (This helps us understand urgency.)",
             ["Immediately", "Within 1–3 months", "3–6 months", "Just exploring"]
           );
         }, 400);
         break;
       }

      // 6: Timeline / lead score
       case 6: {
         let leadScore: "HOT" | "WARM" | "COLD" = "COLD";
         if (response.includes("Immediately")) leadScore = "HOT";
         else if (response.includes("1–3")) leadScore = "WARM";

         setData((prev) => ({
           ...prev,
           timeline: response,
           leadScore,
         }));

        nextStep = 7;
        setTimeout(() => {
          addBotMessage(
            "Got it. To make this truly useful, what would you like help with right now?",
            [
              "📸 Virtual tour",
              "📝 Shortlisted options with guidance",
              "📍 Best projects in this area",
              "🧑‍💼 Speak with expert",
            ]
          );
        }, 400);
         break;
       }

      // 7: Value-add (single choice, but we store flags)
       case 7: {
         setData((prev) => ({
           ...prev,
           wantsVirtualTour: response.includes("Virtual"),
          // reuse this flag for shortlist help instead of price comparison
          wantsPriceComparison: response.includes("Shortlisted"),
           wantsBestProjects: response.includes("Best projects"),
           wantsExpertCall: response.includes("expert"),
         }));

         nextStep = 8;
         setTimeout(() => {
           addBotMessage(
             "Almost there ✨ By the way, what should I call you?",
             []
           );
         }, 400);
         break;
       }

      // 8: Name
       case 8: {
         setData((prev) => ({ ...prev, userName: response }));
         nextStep = 9;
         setTimeout(() => {
           addBotMessage(
            "Thanks. Please share your mobile number so our expert can reach you with 2–3 best-matched options.",
             []
           );
         }, 400);
         break;
       }

       // 9: Phone
       case 9: {
         if (!isValidPhone(response)) {
           setTimeout(() => {
             addBotMessage(
               "That doesn’t look like a valid phone number. Please enter a 10-digit mobile number so our expert can reach you. 😊",
               []
             );
           }, 300);
           shouldAdvance = false;
           break;
         }

        setData((prev) => ({ ...prev, phoneNumber: response.trim() }));
        nextStep = 10;
        setTimeout(() => {
          addBotMessage(
            "Last step! How would you like to receive property details and shortlists?",
            ["WhatsApp & Call", "Email"]
          );
        }, 400);
         break;
       }

       // 10: Contact preference
       case 10: {
        const normalized = response.toLowerCase();

        if (
          !normalized.includes("whatsapp") &&
          !normalized.includes("email") &&
          !normalized.includes("call")
        ) {
           setTimeout(() => {
             addBotMessage(
              "Please choose one of the options so we know where to send details.",
              ["WhatsApp & Call", "Email"]
             );
           }, 300);
           shouldAdvance = false;
           break;
         }

        const pref =
          response === "Email" || normalized.includes("email")
            ? "Email"
            : "WhatsApp & Call";

         setData((prev) => ({
           ...prev,
           contactPreference: pref,
         }));

        if (pref === "Email") {
           nextStep = 11;
           setTimeout(() => {
             addBotMessage(
               "Great. Please share your email so we can send you curated options and comparisons.",
               []
             );
           }, 400);
        } else {
          // WhatsApp & Call → no email, go straight to confirmation & submit
           const finalData: ChatbotData = {
             ...data,
             phoneNumber: data.phoneNumber,
            contactPreference: "WhatsApp & Call",
             email: "",
           };
           setData(finalData);
           nextStep = 12;
           handleSubmitWithConfirmation(finalData);
         }
         break;
       }

       // 11: Email input
       case 11: {
        const email = response.trim();
        if (!email || !email.includes("@")) {
           setTimeout(() => {
             addBotMessage(
              "That doesn’t look like a valid email. You can also choose “WhatsApp & Call” if you prefer.",
               []
             );
           }, 300);
           shouldAdvance = false;
           break;
         }

         const finalData: ChatbotData = {
           ...data,
           phoneNumber: data.phoneNumber,
          contactPreference: "Email",
           email,
         };
         setData(finalData);
         nextStep = 12;
         handleSubmitWithConfirmation(finalData);
         break;
       }

       default:
         shouldAdvance = false;
         break;
     }

     if (shouldAdvance) {
       setCurrentStep(nextStep);
     }
   };

   const handleSubmitWithConfirmation = async (payload: ChatbotData) => {
     const name = payload.userName || "there";

    // 1) Acknowledgement + expert line together
    addBotMessage(
      `Thanks, ${name} ✨ Our expert will contact you shortly with handpicked options.`,
      []
    );

    // 2) Exploration + actions in a separate message with options
    addBotMessage(
      "While you wait, you can explore some of our curated listings. Would you like to explore properties now or prefer to talk directly?\n\nChoose an option below to continue:",
      ["🔍 View Properties", "📞 Talk Now"]
    );

     setIsSubmitting(true);

     try {
       await fetch("/api/chatbot", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
       });
     } catch (error) {
       console.error("Error submitting chatbot data:", error);
     } finally {
       setIsSubmitting(false);
     }
   };

   const handleInputSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (inputValue.trim() && !isSubmitting) {
       addUserMessage(inputValue.trim());
       handleResponse(inputValue.trim());
       setInputValue("");
     }
   };

   const resetChat = () => {
     setMessages([]);
     setCurrentStep(0);
     setData({});
     setInputValue("");
   };

  // Hide chatbot on admin pages
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] bg-[#0f1112] hover:bg-[#1a1c1e] text-[#CBB27A] rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group w-12 h-12 sm:w-14 sm:h-14 border border-[#CBB27A]/30 touch-manipulation"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#CBB27A] rounded-full animate-pulse" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chatbot-container fixed bottom-4 right-3 left-3 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] w-auto sm:w-[90vw] md:w-96 max-w-full sm:max-w-[calc(100vw-3rem)] md:max-w-[28rem] h-[70vh] sm:h-[600px] max-h-[calc(100vh-2rem)] sm:max-h-[600px] bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#000000]"
          >
            <div className="bg-[#0f1112] text-white p-3 sm:p-4 flex items-center justify-between border-b border-[#CBB27A]/20 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#CBB27A]/20 rounded-full flex items-center justify-center border border-[#CBB27A]/30 flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#CBB27A] text-sm sm:text-base truncate">Celeste Abode</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetChat();
                }}
                className="text-white hover:bg-[#CBB27A]/20 active:bg-[#CBB27A]/30 rounded-full p-1.5 sm:p-1 transition-colors hover:text-[#CBB27A] flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close chatbot"
              >
                <X className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
            </div>

             <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 min-h-0">
              {messages.map((message, index) => (
                 <motion.div
                   key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                   className={`flex ${
                     message.type === "user" ? "justify-end" : "justify-start"
                   }`}
                 >
                   <div
                     className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                       message.type === "user"
                         ? "bg-[#0f1112] text-white border border-[#CBB27A]/30"
                         : "bg-white text-gray-800 shadow-sm border border-gray-200"
                     }`}
                   >
                     <p
                       className={`text-xs sm:text-sm leading-relaxed break-words ${
                         message.type === "user" ? "text-white" : "text-gray-800"
                       }`}
                     >
                       {message.content}
                     </p>
                     {message.type === "bot" &&
                       message.content.includes("explore our curated") && (
                         <Link
                           href="/projects"
                           className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 bg-[#0f1112] hover:bg-[#1a1c1e] active:bg-[#1a1c1e] text-[#CBB27A] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-[#CBB27A]/30 touch-manipulation min-h-[44px]"
                         >
                           Explore Projects
                           <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                         </Link>
                       )}
                   </div>
                 </motion.div>
               ))}

               {messages.length > 0 &&
                 messages[messages.length - 1].type === "bot" &&
                 messages[messages.length - 1].options &&
                 messages[messages.length - 1].options!.length > 0 && (
                   <div className="space-y-2 sm:space-y-2.5 mt-2">
                     {messages[messages.length - 1].options!.map((option, index) => (
                       <motion.button
                         key={index}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 + index * 0.05 }}
                         onClick={() => handleOptionClick(option)}
                         disabled={isSubmitting}
                         className="w-full text-left bg-[#0f1112] hover:bg-[#1a1c1e] active:bg-[#1a1c1e] text-white hover:text-[#CBB27A] active:text-[#CBB27A] rounded-lg px-3 py-2.5 sm:py-2 text-xs sm:text-xs transition-all duration-200 shadow-sm border border-[#CBB27A]/20 hover:border-[#CBB27A]/50 active:border-[#CBB27A]/50 flex items-center justify-between group touch-manipulation min-h-[44px] sm:min-h-[40px] ml-0"
                         style={{ marginLeft: 0 }}
                       >
                         <span className="text-xs sm:text-xs break-words flex-1 pr-2">{option}</span>
                         <ChevronRight className="w-3.5 h-3.5 sm:w-3 sm:h-3 opacity-0 sm:group-hover:opacity-100 transition-opacity text-[#CBB27A] flex-shrink-0" />
                       </motion.button>
                     ))}
                   </div>
                 )}

               {isSubmitting && (
                 <div className="flex justify-start">
                   <div className="bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2 shadow-sm border border-gray-200">
                     <div className="flex gap-1">
                       <div className="w-2 h-2 bg-[#CBB27A] rounded-full animate-bounce chatbot-typing-dot-1" />
                       <div className="w-2 h-2 bg-[#CBB27A] rounded-full animate-bounce chatbot-typing-dot-2" />
                       <div className="w-2 h-2 bg-[#CBB27A] rounded-full animate-bounce chatbot-typing-dot-3" />
                     </div>
                   </div>
                 </div>
               )}

               <div ref={messagesEndRef} />
             </div>

             {(currentStep === 8 || currentStep === 9 || currentStep === 11) && (
               <form
                 onSubmit={handleInputSubmit}
                 className="px-3 pt-3 pb-4 sm:px-4 sm:pt-4 sm:pb-4 border-t border-gray-200 bg-white flex-shrink-0"
                 style={{ paddingBottom: 'max(16px, calc(12px + env(safe-area-inset-bottom)))' }}
               >
                 <div className="flex gap-2 sm:gap-2 items-center">
                   <Input
                     ref={inputRef}
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder={
                       currentStep === 8
                         ? "Enter your name"
                         : currentStep === 9
                         ? "Enter your phone number"
                         : "Enter your email address"
                     }
                     className="flex-1 text-sm sm:text-base h-[44px] sm:h-[40px] leading-[1.5] py-0"
                     style={{ lineHeight: '1.5', paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
                     disabled={isSubmitting}
                     autoComplete={
                       currentStep === 8
                         ? "name"
                         : currentStep === 9
                         ? "tel"
                         : "email"
                     }
                     inputMode={
                       currentStep === 9
                         ? "tel"
                         : currentStep === 11
                         ? "email"
                         : "text"
                     }
                   />
                   <Button
                     type="submit"
                     disabled={!inputValue.trim() || isSubmitting}
                     className="bg-[#0f1112] hover:bg-[#1a1c1e] active:bg-[#1a1c1e] text-[#CBB27A] border border-[#CBB27A]/30 flex-shrink-0 min-w-[44px] sm:min-w-[48px] h-[44px] sm:h-[40px] touch-manipulation"
                   >
                     <Send className="w-4 h-4 sm:w-4 sm:h-4" />
                   </Button>
                 </div>
               </form>
             )}
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 }


