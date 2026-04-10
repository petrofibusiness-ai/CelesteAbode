"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, ChevronRight, ExternalLink, Phone, Instagram, Linkedin } from "lucide-react";
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
  /** Internal ops inventory: no fixed left socials or right WhatsApp / call / chat FABs. */
  const isInternalInventoryRoute =
    pathname === "/ca-internal-inventory-v1" || pathname?.startsWith("/ca-internal-inventory-v1/");
  /** Demo fullscreen hero: hide fixed left IG/FB/LinkedIn stack (not the spec pills). */
  const hideLeftSocialIcons =
    pathname === "/demo-property" || pathname?.startsWith("/demo-property/");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ChatbotData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  /** Left IG/FB/LinkedIn: on pages with [data-site-hero], stay hidden until user scrolls and the stack no longer overlaps a laid-out hero */
  const [showLeftSocial, setShowLeftSocial] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Left social: pages with [data-site-hero] — never show on first paint (avoids 0×0 hero rects before images/layout).
  // Only show after the user has scrolled and the icon zone no longer overlaps a real hero rect.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let rafId = 0;
    /** Reset each navigation; icons stay off until user scrolls on hero pages */
    const hasScrolledRef = { current: false };

    const ICON_ZONE_RIGHT = 130; // px from left edge (covers left-6 + 56px buttons + shadow)
    const ICON_ZONE_BOTTOM_PAD = 28; // matches bottom-6 + breathing room
    const ICON_STACK_EST_HEIGHT = 300; // 3× ~56px buttons + gaps (sm)
    const MIN_HERO_DIM = 8; // below this, getBoundingClientRect is not layout-stable yet — treat as overlapping

    const markScrolledIfNeeded = () => {
      if (window.scrollY > 2) hasScrolledRef.current = true;
    };

    const update = () => {
      if (cancelled) return;
      markScrolledIfNeeded();

      if (hideLeftSocialIcons) {
        setShowLeftSocial(false);
        return;
      }

      const heroes = document.querySelectorAll("[data-site-hero]");
      if (heroes.length === 0) {
        setShowLeftSocial(true);
        return;
      }

      const h = window.innerHeight;
      const zoneTop = h - ICON_STACK_EST_HEIGHT - ICON_ZONE_BOTTOM_PAD;
      const zoneBottom = h;
      const zoneLeft = 0;
      const zoneRight = ICON_ZONE_RIGHT;

      let overlapsAny = false;
      heroes.forEach((el) => {
        const hr = el.getBoundingClientRect();
        if (hr.height < MIN_HERO_DIM || hr.width < MIN_HERO_DIM) {
          overlapsAny = true;
          return;
        }
        const overlaps =
          hr.bottom > zoneTop &&
          hr.top < zoneBottom &&
          hr.right > zoneLeft &&
          hr.left < zoneRight;
        if (overlaps) overlapsAny = true;
      });

      setShowLeftSocial(!overlapsAny && hasScrolledRef.current);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(() => scheduleUpdate());

    const observeHeroes = () => {
      ro.disconnect();
      document.querySelectorAll("[data-site-hero]").forEach((el) => {
        ro.observe(el);
      });
    };

    observeHeroes();
    scheduleUpdate();
    // Next.js may swap route content after this effect runs; re-bind observers next frame.
    requestAnimationFrame(() => {
      if (cancelled) return;
      observeHeroes();
      scheduleUpdate();
    });

    const onScroll = () => {
      markScrolledIfNeeded();
      scheduleUpdate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname, hideLeftSocialIcons]);

  // Clear phone error when step changes away from phone input
  useEffect(() => {
    if (currentStep !== 9) {
      setPhoneError(false);
    }
  }, [currentStep]);

  // Handle input focus to scroll into view when keyboard opens
  useEffect(() => {
    if (!inputRef.current || typeof window === 'undefined') return;
    if (currentStep !== 1 && currentStep !== 9 && currentStep !== 11) return;

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
          "Hi there! I'm Amaira, your friendly property advisor at Celeste Abode. I'm here to help you find the perfect property. Would you like me to guide you?",
          ["Yes, please help me", "I'm just exploring"]
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
         window.location.href = "/properties";
       }
       return;
     }

     if (option.startsWith("📞 Talk Now")) {
       if (typeof window !== "undefined") {
         const phoneNumber = (process.env.NEXT_PUBLIC_SALES_PHONE as string) || "+919910906306";
         window.location.href = `tel:${phoneNumber}`;
       }
       return;
     }

     addUserMessage(option);
     handleResponse(option);
   };

   const isValidPhone = (value: string) => {
     // Extract only digits
     const digits = value.trim().replace(/\D/g, '');
     
     // Basic format check - must be 10-12 digits
     // 10 digits: local number (e.g., 9910906306)
     // 11-12 digits: with country code (e.g., +91 9910906306 = 12 digits, +1 5551234567 = 11 digits)
     if (digits.length < 10 || digits.length > 12) {
       return false;
     }
     
     // Check for all zeros (0000000000, etc.)
     if (/^0+$/.test(digits)) {
       return false;
     }
     
     // Check for repeated numbers (1111111111, 2222222222, etc.)
     // Check if all digits are the same
     if (/^(\d)\1{9,}$/.test(digits)) {
       return false;
     }
     
     // Check for sequential numbers (1234567890, 0123456789, etc.)
     const isSequential = (str: string) => {
       for (let i = 0; i < str.length - 1; i++) {
         const current = parseInt(str[i]);
         const next = parseInt(str[i + 1]);
         // Check if next digit is current + 1 (handles wrap-around like 9->0)
         if (next !== (current + 1) % 10) {
           return false;
         }
       }
       return str.length >= 10;
     };
     
     // Check for reverse sequential (9876543210, 987654321, etc.)
     const isReverseSequential = (str: string) => {
       for (let i = 0; i < str.length - 1; i++) {
         const current = parseInt(str[i]);
         const next = parseInt(str[i + 1]);
         // Check if next digit is current - 1 (handles wrap-around like 0->9)
         if (next !== (current - 1 + 10) % 10) {
           return false;
         }
       }
       return str.length >= 10;
     };
     
     if (isSequential(digits) || isReverseSequential(digits)) {
       return false;
     }
     
     return true;
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
           normalized.includes("help") ||
           normalized.includes("please") ||
           normalized.includes("okay") ||
           normalized.includes("ok") ||
           normalized.includes("start")
         ) {
           nextStep = 1;
           setTimeout(() => {
             addBotMessage(
               "That's wonderful! I'd love to get to know you better. What should I call you?",
               []
             );
           }, 400);
         } else {
           setTimeout(() => {
             addBotMessage(
               "No worries at all! Feel free to explore at your own pace. I'm here whenever you're ready - just let me know if you'd like my help finding the perfect property.",
               ["Yes, please help me"]
             );
           }, 400);
           shouldAdvance = false;
         }
         break;
       }

       // 1: Name collection
       case 1: {
         setData((prev) => ({ ...prev, userName: response }));
         nextStep = 2;
         setTimeout(() => {
           addBotMessage(
             `Nice to meet you, ${response}! Now, what are you looking for today? This helps me show you only the most relevant options.`,
             [
               "🏠 Buy a property",
               "🏢 Rent a property",
               "💼 Invest in real estate",
               "🤝 Talk to an expert",
             ]
           );
         }, 400);
         break;
       }

       // 2: Intent
       case 2: {
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
           nextStep = 9;
           setTimeout(() => {
             addBotMessage(
               `Perfect, ${data.userName || "there"}! I'll connect you with an expert right away. Please share your mobile number so our expert can reach you.`,
               []
             );
           }, 400);
         } else {
           nextStep = 3;
           const userName = data.userName || "";
           setTimeout(() => {
             addBotMessage(
               `${userName ? userName + ", " : ""}what type of property interests you? This helps me keep my recommendations precise for you.`,
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

       // 3: Property type (previously case 2, now shifted)
       case 3: {
         setData((prev) => ({ ...prev, propertyType: response }));
         nextStep = 4;
         const userName = data.userName || "";
         setTimeout(() => {
           addBotMessage(
             `Got it, ${userName}! Any preferred location? This helps us match projects that fit your lifestyle perfectly. 📍`,
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

       // 4: Location preference
       case 4: {
         setData((prev) => ({ ...prev, preferredLocation: response }));
         nextStep = 5;
         const userName = data.userName || "";
         setTimeout(() => {
           addBotMessage(
             `Understood, ${userName}! What budget range should I keep in mind? This way, you'll only see realistic options that work for you.`,
             [
               "Under 1Cr",
               "1-2 cr",
               "2-5 cr",
               "5 cr +",
               "Not decided yet",
             ]
           );
         }, 400);
         break;
       }

       // 5: Budget
       case 5: {
         setData((prev) => ({ ...prev, budgetRange: response }));
         nextStep = 6;

         const propertyType = data.propertyType || "";
         const userName = data.userName || "";
         if (propertyType.includes("Commercial")) {
           setTimeout(() => {
             addBotMessage(
               `Almost there, ${userName}! What will the commercial space be used for?`,
               ["Office", "Retail", "Warehouse", "Mixed-use"]
             );
           }, 400);
         } else if (propertyType.includes("Plot")) {
           // For plots, skip BHK / usage
           nextStep = 7;
           setTimeout(() => {
             addBotMessage(
               `${userName}, when are you planning to move or invest? This helps us prioritize the right options for you.`,
               ["Immediately", "Within 1–3 months", "3–6 months", "Just exploring"]
             );
           }, 400);
         } else {
           setTimeout(() => {
             addBotMessage(
               `Nice, ${userName}! For residential options, how many bedrooms are you looking for?`,
               ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Flexible"]
             );
           }, 400);
         }
         break;
       }

       // 6: Property details (BHK or commercial use) (previously case 5)
       case 6: {
         const propertyType = data.propertyType || "";

         if (propertyType.includes("Commercial")) {
           setData((prev) => ({ ...prev, commercialUse: response }));
         } else if (!propertyType.includes("Plot")) {
           setData((prev) => ({ ...prev, bhkPreference: response }));
         }

         nextStep = 7;
         const userName = data.userName || "";
         setTimeout(() => {
           addBotMessage(
             `Great, ${userName}! When are you planning to move or invest? This helps us understand your timeline better.`,
             ["Immediately", "Within 1–3 months", "3–6 months", "Just exploring"]
           );
         }, 400);
         break;
       }

      // 7: Timeline / lead score
       case 7: {
         let leadScore: "HOT" | "WARM" | "COLD" = "COLD";
         if (response.includes("Immediately")) leadScore = "HOT";
         else if (response.includes("1–3")) leadScore = "WARM";

         setData((prev) => ({
           ...prev,
           timeline: response,
           leadScore,
         }));

        nextStep = 8;
        const userName = data.userName || "";
        setTimeout(() => {
          addBotMessage(
            `Got it, ${userName}! To make this truly useful for you, what would you like help with right now?`,
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

      // 8: Value-add (single choice, but we store flags)
       case 8: {
         setData((prev) => ({
           ...prev,
           wantsVirtualTour: response.includes("Virtual"),
          // reuse this flag for shortlist help instead of price comparison
          wantsPriceComparison: response.includes("Shortlisted"),
           wantsBestProjects: response.includes("Best projects"),
           wantsExpertCall: response.includes("expert"),
         }));

         nextStep = 9;
         const userName = data.userName || "";
         setTimeout(() => {
           addBotMessage(
             `Almost there, ${userName} ✨ Please share your mobile number so our expert can reach you with 2–3 best-matched options.`,
             []
           );
         }, 400);
         break;
       }

      // 9: Phone (previously case 9)
      case 9: {
        if (!isValidPhone(response)) {
          setPhoneError(true);
          const userName = data.userName || "";
          setTimeout(() => {
            addBotMessage(
              `${userName ? userName + ", " : ""}that doesn't look like a valid phone number. Please enter a valid phone number. 😊`,
              []
            );
          }, 300);
          shouldAdvance = false;
          break; // Don't advance, keep input value
        }

        // Valid phone number - clear error and proceed
        setPhoneError(false);
        setData((prev) => ({ ...prev, phoneNumber: response.trim() }));
        nextStep = 10;
        const userName = data.userName || "";
        setTimeout(() => {
          addBotMessage(
            `Last step, ${userName}! How would you like to receive property details and shortlists?`,
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
           const userName = data.userName || "";
           setTimeout(() => {
             addBotMessage(
               `Great, ${userName}! Please share your email so we can send you curated options and comparisons.`,
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
       const trimmedValue = inputValue.trim();
       addUserMessage(trimmedValue);
       
       // For phone step, validate before clearing input
       if (currentStep === 9) {
         if (!isValidPhone(trimmedValue)) {
           setPhoneError(true);
           handleResponse(trimmedValue);
           // Don't clear input - keep it so user can fix it
           return;
         } else {
           setPhoneError(false);
         }
       }
       
       handleResponse(trimmedValue);
       setInputValue("");
     }
   };

   const resetChat = () => {
     setMessages([]);
     setCurrentStep(0);
     setData({});
     setInputValue("");
     setPhoneError(false);
   };

  // Hide chatbot on admin + internal inventory (clean dashboard, no side floats)
  if (isAdminRoute || isInternalInventoryRoute) {
    return null;
  }

  return (
    <>
      {/* Left: Instagram, Facebook, LinkedIn — hidden on demo-property; elsewhere hidden on mobile / until clear of [data-site-hero] */}
      {!hideLeftSocialIcons ? (
        <motion.div
          initial={false}
          animate={{
            opacity: showLeftSocial ? 1 : 0,
            x: showLeftSocial ? 0 : -12,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`hidden md:flex fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-[9999] flex-col gap-3 sm:gap-4 ${
            showLeftSocial ? "" : "pointer-events-none"
          }`}
          aria-hidden={!showLeftSocial}
        >
          <a
            href="https://www.instagram.com/celesteabode/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 touch-manipulation"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a
            href="https://www.facebook.com/people/Celeste-Abode/61579337236985/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#0F5DC8] text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 touch-manipulation"
            aria-label="Facebook"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              aria-hidden
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847v-3.622h2.973V8.413c0-2.943 1.796-4.55 4.416-4.55 1.255 0 2.333.093 2.646.135v3.07h-1.817c-1.426 0-1.7.678-1.7 1.671v2.191h3.397l-.442 3.622h-2.955V24h5.797C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/celeste-abode/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 touch-manipulation"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </motion.div>
      ) : null}

      {/* Right: WhatsApp and Call Buttons - Above Chatbot */}
      <motion.a
        href="https://wa.me/919910906306"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-[144px] right-4 sm:bottom-[168px] sm:right-6 z-[9999] bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group w-12 h-12 sm:w-14 sm:h-14 touch-manipulation"
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
      <motion.a
        href="tel:+919910906306"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-[80px] right-4 sm:bottom-[96px] sm:right-6 z-[9999] bg-green-600 hover:bg-green-700 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group w-12 h-12 sm:w-14 sm:h-14 touch-manipulation"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.a>

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
                  <h3 className="font-semibold text-[#CBB27A] text-sm sm:text-base truncate font-poppins">Property Advisor</h3>
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
                       className={`text-xs sm:text-sm leading-relaxed break-words font-poppins ${
                         message.type === "user" ? "text-white" : "text-gray-800"
                       }`}
                     >
                       {message.content}
                     </p>
                     {message.type === "bot" &&
                       message.content.includes("explore our curated") && (
                         <Link
                           href="/properties"
                           className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 bg-[#0f1112] hover:bg-[#1a1c1e] active:bg-[#1a1c1e] text-[#CBB27A] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-[#CBB27A]/30 touch-manipulation min-h-[44px]"
                         >
                           Explore Properties
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
                         <span className="text-xs sm:text-xs break-words flex-1 pr-2 font-poppins">{option}</span>
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

             {(currentStep === 1 || currentStep === 9 || currentStep === 11) && (
               <form
                 onSubmit={handleInputSubmit}
                 className="px-3 pt-3 pb-4 sm:px-4 sm:pt-4 sm:pb-4 border-t border-gray-200 bg-white flex-shrink-0"
                 style={{ paddingBottom: 'max(16px, calc(12px + env(safe-area-inset-bottom)))' }}
               >
                 <div className="flex gap-2 sm:gap-2 items-center">
                   <Input
                     ref={inputRef}
                     value={inputValue}
                     onChange={(e) => {
                       setInputValue(e.target.value);
                       // Clear error when user starts typing
                       if (currentStep === 9 && phoneError) {
                         setPhoneError(false);
                       }
                     }}
                     placeholder={
                       currentStep === 1
                         ? "Enter your name"
                         : currentStep === 9
                         ? "Enter your phone number (10 digits)"
                         : "Enter your email address"
                     }
                     className={`flex-1 text-sm sm:text-base h-[44px] sm:h-[40px] leading-[1.5] py-0 font-poppins ${
                       phoneError && currentStep === 9
                         ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                         : ""
                     }`}
                     style={{ lineHeight: '1.5', paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
                     disabled={isSubmitting}
                     autoComplete={
                       currentStep === 1
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

             {/* Powered by Vitespace */}
             <div className="px-3 py-2 sm:px-4 sm:py-2 border-t border-gray-200 bg-white flex-shrink-0">
               <p className="text-xs text-gray-400 text-center">
                 Powered by{" "}
                 <Link
                   href="https://www.vitespace.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-[#CBB27A] hover:text-[#CBB27A]/80 transition-colors"
                 >
                   Vitespace
                 </Link>
               </p>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 }


