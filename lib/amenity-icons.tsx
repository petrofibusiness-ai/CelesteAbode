import React from "react";
import {
  Droplets,
  TreePine,
  Shield,
  Coffee,
  Dumbbell,
  Sparkles,
  Heart,
  Music,
  Camera,
  Gamepad2,
  Wind,
  Zap,
  Users,
  Home,
  Building2,
  Car,
  MapPin,
  Award,
  Star,
  UtensilsCrossed,
  Waves,
  Sun,
  Moon,
  Flower2,
  Bike,
  Footprints,
  Baby,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Film,
  Radio,
  BookOpen,
  Palette,
  Briefcase,
  Mail,
  Phone,
  Wifi,
  Tv,
  CarFront,
  ParkingCircle,
  Lock,
  Key,
  Bell,
  Video,
  Image as ImageIcon,
  FileText,
  Calendar,
  Clock,
  Wrench,
  Map,
  Navigation,
  Compass,
  Globe,
  Plane,
  Train,
  Bus,
  Ship,
  Route,
  Landmark,
  Building,
  Factory,
  Store,
  Hotel,
  School,
  Hospital,
  Landmark as Bank,
  Church,
  Umbrella,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  SunSnow,
  Thermometer,
  Gauge,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  LineChart,
  Target,
  Flag,
  Trophy,
  Medal,
  Crown,
  Gem,
  Diamond,
  HeartHandshake,
  HandHeart,
  Handshake,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
  UsersRound,
  Users as UserRound,
  UserCircle,
  UserSquare,
  User,
  UserCog,
  UserSearch,
  UserShield,
  UserCheck2,
} from "lucide-react";

// Map amenity names to icon components
// Keys are normalized to lowercase for case-insensitive matching
export const amenityIconMap: Record<string, React.ComponentType<any>> = {
  // Swimming & Water - Distinct icons
  "swimming pool": Droplets,
  "half-olympic swimming pool": Droplets,
  "elevated pool": Droplets,
  "pool": Droplets,
  "swimming": Droplets,
  "water": Droplets,
  "aqua": Droplets,
  "spa": Waves,
  "jacuzzi": Waves,
  "steam room": Waves,
  "sauna": Waves,
  
  // Green & Nature - Distinct icons
  "green landscape": TreePine,
  "landscape": TreePine,
  "garden": TreePine,
  "park": TreePine,
  "green": TreePine,
  "trees": TreePine,
  "forest": TreePine,
  "nature": TreePine,
  "eco": TreePine,
  "environment": TreePine,
  "sustainability": TreePine,
  "yoga garden": Flower2,
  "meditation area": Flower2,
  "meditation": Flower2,
  "zen": Flower2,
  
  // Security - Distinct icons
  "24/7 security": Shield,
  "24x7 security": Shield,
  "security": Shield,
  "gated community": Shield,
  "gated": Shield,
  "cctv surveillance": Camera,
  "cctv": Camera,
  "surveillance": Camera,
  "security guard": Shield,
  "guard": Shield,
  "safety": Shield,
  "secure": Shield,
  "protected": Shield,
  
  // Clubhouse & Community - Distinct icons
  "clubhouse": Coffee,
  "club": Coffee,
  "community center": Coffee,
  "community": Coffee,
  "lounge": Coffee,
  "party hall": Music,
  "banquet hall": Music,
  "party": Music,
  "event": Music,
  "banquet": Music,
  "amphitheatre": Film,
  "amphitheater": Film,
  "theater": Film,
  "theatre": Film,
  "mini theatre": Film,
  "cinema": Film,
  
  // Sports & Fitness - Distinct icons
  "gymnasium": Dumbbell,
  "fitness center": Dumbbell,
  "gym": Dumbbell,
  "fitness": Dumbbell,
  "workout": Dumbbell,
  "exercise": Dumbbell,
  "tennis court": Gamepad2,
  "tennis courts": Gamepad2,
  "tennis": Gamepad2,
  "badminton court": Gamepad2,
  "badminton": Gamepad2,
  "sports facilities": Gamepad2,
  "sports": Gamepad2,
  "basketball court": Gamepad2,
  "basketball": Gamepad2,
  "volleyball court": Gamepad2,
  "volleyball": Gamepad2,
  "squash court": Gamepad2,
  "squash": Gamepad2,
  "cricket ground": Gamepad2,
  "cricket": Gamepad2,
  "football field": Gamepad2,
  "football": Gamepad2,
  "jogging track": Footprints,
  "cycling track": Bike,
  "jogging": Footprints,
  "running": Footprints,
  "walking": Footprints,
  "cycling": Bike,
  "bike": Bike,
  "bicycle": Bike,
  
  // Kids & Family - Distinct icons
  "children's play area": Baby,
  "kids zone": Baby,
  "playground": Baby,
  "play area": Baby,
  "kids play": Baby,
  "kids": Baby,
  "children": Baby,
  "family": Users,
  "daycare": Baby,
  "crèche": Baby,
  
  // Wellness & Health - Distinct icons
  "wellness center": Heart,
  "wellness facilities": Heart,
  "wellness": Heart,
  "healthcare": Stethoscope,
  "medical center": Stethoscope,
  "medical": Stethoscope,
  "hospital nearby": Hospital,
  "hospital": Hospital,
  "clinic": Stethoscope,
  "pharmacy": Stethoscope,
  "health": Heart,
  
  // Shopping & Services - Distinct icons
  "shopping mall": ShoppingBag,
  "shopping": ShoppingBag,
  "mall": ShoppingBag,
  "retail shops": ShoppingBag,
  "retail": ShoppingBag,
  "store": Store,
  "supermarket": ShoppingBag,
  "market": ShoppingBag,
  "bank": Bank,
  "atm": Bank,
  "banking": Bank,
  
  // Education - Distinct icons
  "school nearby": School,
  "school": School,
  "educational institutions": GraduationCap,
  "education": GraduationCap,
  "educational": GraduationCap,
  "university nearby": GraduationCap,
  "university": GraduationCap,
  "college nearby": GraduationCap,
  "college": GraduationCap,
  "library": BookOpen,
  "study": BookOpen,
  
  // Entertainment - Distinct icons
  "entertainment zone": Sparkles,
  "entertainment": Sparkles,
  "recreation area": Sparkles,
  "recreation": Sparkles,
  "games room": Gamepad2,
  "gaming zone": Gamepad2,
  "games": Gamepad2,
  "gaming": Gamepad2,
  "arcade": Gamepad2,
  "music room": Music,
  "music": Music,
  "karaoke": Music,
  "dance studio": Music,
  "dance": Music,
  
  // Technology - Distinct icons
  "wifi": Wifi,
  "internet": Wifi,
  "smart home": Zap,
  "home automation": Zap,
  "smart": Zap,
  "automation": Zap,
  "technology": Zap,
  "digital features": Zap,
  "digital": Zap,
  "tv": Tv,
  "television": Tv,
  "cable tv": Tv,
  "cable": Tv,
  
  // Parking & Transportation - Distinct icons
  "parking": ParkingCircle,
  "car parking": ParkingCircle,
  "parking space": ParkingCircle,
  "garage": CarFront,
  "car": Car,
  "public transport": Bus,
  "transport": Bus,
  "bus connectivity": Bus,
  "bus": Bus,
  "metro connectivity": Train,
  "metro": Train,
  "train connectivity": Train,
  "train": Train,
  "good connectivity": Route,
  "connectivity": Route,
  "prime location": MapPin,
  "location": MapPin,
  "accessibility": Navigation,
  
  // Luxury & Premium - Distinct icons
  "luxury features": Crown,
  "luxury": Crown,
  "premium finishes": Crown,
  "premium": Crown,
  "elite community": Crown,
  "elite": Crown,
  "exclusive": Crown,
  "vip services": Crown,
  "vip": Crown,
  "concierge": Briefcase,
  "butler service": Briefcase,
  "butler": Briefcase,
  "service": Briefcase,
  
  // Food & Dining - Distinct icons
  "restaurant": UtensilsCrossed,
  "dining area": UtensilsCrossed,
  "dining": UtensilsCrossed,
  "cafe": Coffee,
  "café": Coffee,
  "food court": UtensilsCrossed,
  "food": UtensilsCrossed,
  "kitchen": UtensilsCrossed,
  
  // Art & Culture - Distinct icons
  "art gallery": Palette,
  "art": Palette,
  "gallery": Palette,
  "cultural center": Palette,
  "culture": Palette,
  "museum nearby": Palette,
  "museum": Palette,
  
  // Weather & Climate - Distinct icons
  "air conditioning": Wind,
  "ac": Wind,
  "heating": Sun,
  "climate control": Sun,
  "climate": Sun,
  "ventilation": Wind,
  "cross ventilation": Wind,
  
  // Awards & Recognition - Distinct icons
  "award winning": Award,
  "award": Award,
  "certified": Award,
  "certification": Award,
  "recognition": Award,
  "accreditation": Award,
  "rated": Star,
  "star rated": Star,
  "rating": Star,
  "stars": Star,
  
  // Miscellaneous - Distinct icons
  "power backup": Zap,
  "backup": Zap,
  "generator": Zap,
  "electricity": Zap,
  "water supply": Droplets,
  "supply": Droplets,
  "maintenance": Wrench,
  "housekeeping": Home,
  "laundry": Home,
  "storage": Home,
  "lift": Building2,
  "elevator": Building2,
  "stairs": Building2,
  "lobby": Building2,
  "reception": Building2,
  "conference room": Briefcase,
  "meeting room": Briefcase,
  "conference": Briefcase,
  "meeting": Briefcase,
  "business center": Briefcase,
  "business": Briefcase,
  "office space": Briefcase,
  "office": Briefcase,
  "co-working space": Briefcase,
  "coworking space": Briefcase,
  "workspace": Briefcase,
  "co-working": Briefcase,
  "coworking": Briefcase,
};

// Default icon if no match found
const DefaultIcon = Sparkles;

/**
 * Get icon component for an amenity name
 * Performs case-insensitive matching with priority on exact matches
 * Ensures each amenity gets a unique icon based on its primary keyword
 */
export function getAmenityIcon(amenityName: string): React.ComponentType<any> {
  if (!amenityName) return DefaultIcon;
  
  const normalized = amenityName.toLowerCase().trim();
  
  // Priority 1: Exact match (case-insensitive) - most specific
  if (amenityIconMap[normalized]) {
    const icon = amenityIconMap[normalized];
    // React components are valid if they exist (they can be functions or forwardRef components)
    if (icon) {
      return icon;
    }
  }
  
  // Priority 2: Try matching with common variations (remove special chars, extra spaces)
  const cleaned = normalized.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleaned !== normalized && amenityIconMap[cleaned]) {
    const icon = amenityIconMap[cleaned];
    if (icon) {
      return icon;
    }
  }
  
  // Priority 3: Word-by-word matching - find the most specific keyword match
  // Split into words and try to match the most specific word first
  const words = normalized.split(/\s+/).filter(w => w.length > 2);
  
  // Sort words by length (longest first) for more specific matches
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  
  for (const word of sortedWords) {
    if (amenityIconMap[word]) {
      const icon = amenityIconMap[word];
      if (icon) {
        return icon;
      }
    }
  }
  
  // Priority 4: Multi-word phrase matching - check for compound phrases
  // Try matching 2-word and 3-word combinations
  for (let i = 0; i < words.length - 1; i++) {
    const twoWord = `${words[i]} ${words[i + 1]}`;
    if (amenityIconMap[twoWord]) {
      const icon = amenityIconMap[twoWord];
      if (icon) {
        return icon;
      }
    }
  }
  
  for (let i = 0; i < words.length - 2; i++) {
    const threeWord = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    if (amenityIconMap[threeWord]) {
      const icon = amenityIconMap[threeWord];
      if (icon) {
        return icon;
      }
    }
  }
  
  // Priority 5: Partial match - only as last resort, use longest key that contains the amenity
  let bestMatch: { key: string; Icon: React.ComponentType<any>; length: number } | null = null;
  for (const [key, Icon] of Object.entries(amenityIconMap)) {
    // Only match if the key is contained in the amenity name (not the other way around)
    // This prevents generic matches
    if (normalized.includes(key) && key.length >= 3) {
      if (Icon) {
        if (!bestMatch || key.length > bestMatch.length) {
          bestMatch = { key, Icon, length: key.length };
        }
      }
    }
  }
  
  if (bestMatch && bestMatch.Icon) {
    return bestMatch.Icon;
  }
  
  // Fallback: return default icon
  return DefaultIcon;
}

/**
 * Render amenity icon as SVG component
 */
export function AmenityIcon({ 
  amenityName, 
  className = "w-8 h-8 sm:w-10 sm:h-10",
  color = "#CBB27A",
  strokeWidth = 2
}: { 
  amenityName: string; 
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  const IconComponent = getAmenityIcon(amenityName);
  
  // Safety check: ensure IconComponent is valid (React components can be functions, forwardRef, etc.)
  if (!IconComponent) {
    console.warn(`Invalid icon component for amenity: ${amenityName}`);
    return <DefaultIcon className={className} style={{ color }} strokeWidth={strokeWidth} />;
  }
  
  // Render the icon component - React will handle it whether it's a function or forwardRef
  return <IconComponent className={className} style={{ color }} strokeWidth={strokeWidth} />;
}

