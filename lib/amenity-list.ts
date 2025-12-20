// Extract all unique amenity keywords from the icon mapping
// These are the predefined amenities that users can select from

export const PREDEFINED_AMENITIES = [
  // Swimming & Water
  "Swimming Pool",
  "Half-Olympic Swimming Pool",
  "Elevated Pool",
  "Spa",
  "Jacuzzi",
  "Steam Room",
  "Sauna",
  
  // Green & Nature
  "Green Landscape",
  "Garden",
  "Park",
  "Yoga Garden",
  "Meditation Area",
  
  // Security
  "24/7 Security",
  "Gated Community",
  "CCTV Surveillance",
  "Security Guard",
  
  // Clubhouse & Community
  "Clubhouse",
  "Community Center",
  "Lounge",
  "Party Hall",
  "Banquet Hall",
  "Amphitheatre",
  "Mini Theatre",
  "Cinema",
  
  // Sports & Fitness
  "Gymnasium",
  "Fitness Center",
  "Tennis Court",
  "Tennis Courts",
  "Badminton Court",
  "Sports Facilities",
  "Basketball Court",
  "Volleyball Court",
  "Squash Court",
  "Cricket Ground",
  "Football Field",
  "Jogging Track",
  "Cycling Track",
  
  // Kids & Family
  "Children's Play Area",
  "Kids Zone",
  "Playground",
  "Daycare",
  
  // Wellness & Health
  "Wellness Center",
  "Wellness Facilities",
  "Healthcare",
  "Medical Center",
  "Hospital Nearby",
  "Clinic",
  "Pharmacy",
  
  // Shopping & Services
  "Shopping Mall",
  "Retail Shops",
  "Supermarket",
  "Bank",
  "ATM",
  
  // Education
  "School Nearby",
  "Educational Institutions",
  "University Nearby",
  "College Nearby",
  "Library",
  
  // Entertainment
  "Entertainment Zone",
  "Recreation Area",
  "Games Room",
  "Gaming Zone",
  "Music Room",
  "Karaoke",
  "Dance Studio",
  
  // Technology
  "WiFi",
  "Internet",
  "Smart Home",
  "Home Automation",
  "Digital Features",
  "TV",
  "Cable TV",
  
  // Parking & Transportation
  "Parking",
  "Car Parking",
  "Parking Space",
  "Garage",
  "Public Transport",
  "Bus Connectivity",
  "Metro Connectivity",
  "Train Connectivity",
  "Good Connectivity",
  "Prime Location",
  
  // Luxury & Premium
  "Luxury Features",
  "Premium Finishes",
  "Elite Community",
  "Exclusive",
  "VIP Services",
  "Concierge",
  "Butler Service",
  
  // Food & Dining
  "Restaurant",
  "Dining Area",
  "Cafe",
  "Food Court",
  
  // Art & Culture
  "Art Gallery",
  "Cultural Center",
  "Museum Nearby",
  
  // Weather & Climate
  "Air Conditioning",
  "AC",
  "Heating",
  "Climate Control",
  "Ventilation",
  "Cross Ventilation",
  
  // Awards & Recognition
  "Award Winning",
  "Certified",
  "Rated",
  "Star Rated",
  
  // Miscellaneous
  "Power Backup",
  "Generator",
  "Electricity",
  "Water Supply",
  "Maintenance",
  "Housekeeping",
  "Laundry",
  "Storage",
  "Lift",
  "Elevator",
  "Lobby",
  "Reception",
  "Conference Room",
  "Meeting Room",
  "Business Center",
  "Office Space",
  "Co-working Space",
] as const;

// Sort amenities alphabetically for better UX
export const SORTED_AMENITIES = [...PREDEFINED_AMENITIES].sort((a, b) => 
  a.localeCompare(b, undefined, { sensitivity: 'base' })
);

// Group amenities by category for better organization
export const AMENITIES_BY_CATEGORY = {
  "Swimming & Water": [
    "Swimming Pool",
    "Half-Olympic Swimming Pool",
    "Elevated Pool",
    "Spa",
    "Jacuzzi",
    "Steam Room",
    "Sauna",
  ],
  "Green & Nature": [
    "Green Landscape",
    "Garden",
    "Park",
    "Yoga Garden",
    "Meditation Area",
  ],
  "Security": [
    "24/7 Security",
    "Gated Community",
    "CCTV Surveillance",
    "Security Guard",
  ],
  "Clubhouse & Community": [
    "Clubhouse",
    "Community Center",
    "Lounge",
    "Party Hall",
    "Banquet Hall",
    "Amphitheatre",
    "Mini Theatre",
    "Cinema",
  ],
  "Sports & Fitness": [
    "Gymnasium",
    "Fitness Center",
    "Tennis Court",
    "Tennis Courts",
    "Badminton Court",
    "Sports Facilities",
    "Basketball Court",
    "Volleyball Court",
    "Squash Court",
    "Cricket Ground",
    "Football Field",
    "Jogging Track",
    "Cycling Track",
  ],
  "Kids & Family": [
    "Children's Play Area",
    "Kids Zone",
    "Playground",
    "Daycare",
  ],
  "Wellness & Health": [
    "Wellness Center",
    "Wellness Facilities",
    "Healthcare",
    "Medical Center",
    "Hospital Nearby",
    "Clinic",
    "Pharmacy",
  ],
  "Shopping & Services": [
    "Shopping Mall",
    "Retail Shops",
    "Supermarket",
    "Bank",
    "ATM",
  ],
  "Education": [
    "School Nearby",
    "Educational Institutions",
    "University Nearby",
    "College Nearby",
    "Library",
  ],
  "Entertainment": [
    "Entertainment Zone",
    "Recreation Area",
    "Games Room",
    "Gaming Zone",
    "Music Room",
    "Karaoke",
    "Dance Studio",
  ],
  "Technology": [
    "WiFi",
    "Internet",
    "Smart Home",
    "Home Automation",
    "Digital Features",
    "TV",
    "Cable TV",
  ],
  "Parking & Transportation": [
    "Parking",
    "Car Parking",
    "Parking Space",
    "Garage",
    "Public Transport",
    "Bus Connectivity",
    "Metro Connectivity",
    "Train Connectivity",
    "Good Connectivity",
    "Prime Location",
  ],
  "Luxury & Premium": [
    "Luxury Features",
    "Premium Finishes",
    "Elite Community",
    "Exclusive",
    "VIP Services",
    "Concierge",
    "Butler Service",
  ],
  "Food & Dining": [
    "Restaurant",
    "Dining Area",
    "Cafe",
    "Food Court",
  ],
  "Art & Culture": [
    "Art Gallery",
    "Cultural Center",
    "Museum Nearby",
  ],
  "Climate Control": [
    "Air Conditioning",
    "AC",
    "Heating",
    "Climate Control",
    "Ventilation",
    "Cross Ventilation",
  ],
  "Awards & Recognition": [
    "Award Winning",
    "Certified",
    "Rated",
    "Star Rated",
  ],
  "Utilities & Services": [
    "Power Backup",
    "Generator",
    "Electricity",
    "Water Supply",
    "Maintenance",
    "Housekeeping",
    "Laundry",
    "Storage",
    "Lift",
    "Elevator",
    "Lobby",
    "Reception",
    "Conference Room",
    "Meeting Room",
    "Business Center",
    "Office Space",
    "Co-working Space",
  ],
} as const;

