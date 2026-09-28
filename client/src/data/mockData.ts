export interface EventCategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  featured?: boolean;
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  image: string;
}

export interface WorkProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  date: string;
  image: string;
  videoUrl?: string;
  isFeatured?: boolean;
  guestCount?: number;
  servicesProvided: string[];
}

export interface ReviewData {
  id: string;
  customerName: string;
  role?: string;
  customerPhoto: string;
  rating: number;
  reviewText: string;
  eventTitle: string;
  location: string;
  date: string;
  videoUrl?: string;
  isDemo: boolean;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

// -------------------------------------------------------------
// EVENT CATEGORIES (20 Required Categories)
// -------------------------------------------------------------
export const EVENT_CATEGORIES: EventCategoryData[] = [
  {
    id: 'cat-1',
    name: 'Weddings',
    slug: 'weddings',
    tagline: 'Timeless Grandeur',
    description: 'Bespoke royal weddings, destination mandaps, and lavish celebratory receptions.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    icon: 'HeartHandshake',
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Engagements',
    slug: 'engagements',
    tagline: 'The First Promise',
    description: 'Intimate candlelit rings, opulent floral backdrops, and unforgettable cocktail soirées.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    icon: 'Sparkles',
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Birthdays',
    slug: 'birthdays',
    tagline: 'Milestone Celebrations',
    description: 'Extravagant 1st birthdays, luxury sweet 16s, and majestic golden jubilee galas.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    icon: 'Cake',
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'Anniversaries',
    slug: 'anniversaries',
    tagline: 'Enduring Legacies',
    description: 'Silver and golden jubilee celebrations with cinematic vow renewals.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    icon: 'Wine',
    featured: true,
  },
  {
    id: 'cat-5',
    name: 'Corporate Events',
    slug: 'corporate-events',
    tagline: 'Executive Precision',
    description: 'Global summits, annual corporate galas, and world-class shareholder banquets.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    icon: 'Briefcase',
    featured: true,
  },
  {
    id: 'cat-6',
    name: 'Concerts & Live Shows',
    slug: 'concerts-live-shows',
    tagline: 'Acoustic Mastery',
    description: 'Stadium arena tours, live artist concerts, and immersive electronic music festivals.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    icon: 'Music2',
    featured: true,
  },
  {
    id: 'cat-7',
    name: 'College Events',
    slug: 'college-events',
    tagline: 'Youthful Momentum',
    description: 'Mega university cultural fests, star-studded DJ nights, and inter-collegiate festivals.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    icon: 'GraduationCap',
    featured: true,
  },
  {
    id: 'cat-8',
    name: 'School Events',
    slug: 'school-events',
    tagline: 'Inspired Milestones',
    description: 'Grand annual day celebrations, sports days, and student graduation ceremonies.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    icon: 'School',
    featured: false,
  },
  {
    id: 'cat-9',
    name: 'Private Parties',
    slug: 'private-parties',
    tagline: 'Exclusive Discretion',
    description: 'Luxury villa parties, penthouse gatherings, and private DJ sundowners.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    icon: 'GlassWater',
    featured: true,
  },
  {
    id: 'cat-10',
    name: 'Baby Showers',
    slug: 'baby-showers',
    tagline: 'Tender Beginnings',
    description: 'Pastel dreamscapes, custom floral swings, and heartfelt maternity festivities.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    icon: 'Smile',
    featured: false,
  },
  {
    id: 'cat-11',
    name: 'Naming Ceremonies',
    slug: 'naming-ceremonies',
    tagline: 'Sacred Blessings',
    description: 'Traditional cradle ceremonies with celestial decor and curated familial feasts.',
    image: 'https://images.unsplash.com/photo-1519225438184-c7919832a454?auto=format&fit=crop&w=1200&q=80',
    icon: 'Sun',
    featured: false,
  },
  {
    id: 'cat-12',
    name: 'Cultural Events',
    slug: 'cultural-events',
    tagline: 'Heritage Celebrations',
    description: 'Folk performances, regional festivals, and authentic cultural showcases.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    icon: 'Globe2',
    featured: true,
  },
  {
    id: 'cat-13',
    name: 'Religious Events',
    slug: 'religious-events',
    tagline: 'Divine Serenity',
    description: 'Devotional kirtans, temple ceremonies, and spiritual congregational gatherings.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    icon: 'Flame',
    featured: false,
  },
  {
    id: 'cat-14',
    name: 'Award Functions',
    slug: 'award-functions',
    tagline: 'Golden Accolades',
    description: 'Red carpet entries, trophy presentations, and high-impact stage productions.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    icon: 'Trophy',
    featured: true,
  },
  {
    id: 'cat-15',
    name: 'Exhibitions & Expos',
    slug: 'exhibitions',
    tagline: 'Curated Showcases',
    description: 'Art gallery installations, industrial trade shows, and bespoke luxury expos.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
    icon: 'Grid3X3',
    featured: false,
  },
  {
    id: 'cat-16',
    name: 'Brand Activations',
    slug: 'brand-activations',
    tagline: 'Experiential Reach',
    description: 'Interactive consumer pop-ups, immersive brand zones, and viral PR setups.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    icon: 'Target',
    featured: false,
  },
  {
    id: 'cat-17',
    name: 'Product Launches',
    slug: 'product-launches',
    tagline: 'Monumental Reveals',
    description: 'Keynote productions, high-tech holographic reveals, and VIP press conferences.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    icon: 'Zap',
    featured: false,
  },
  {
    id: 'cat-18',
    name: 'Fashion Shows',
    slug: 'fashion-shows',
    tagline: 'Haute Couture Runways',
    description: 'Elevated runway lighting, designer showcases, and high-fashion backstage logistics.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    icon: 'Camera',
    featured: false,
  },
  {
    id: 'cat-19',
    name: 'Custom Bespoke Events',
    slug: 'custom-events',
    tagline: 'Limitless Imagination',
    description: 'Anything you can conceive: from island takeovers to themed gala balls.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    icon: 'Compass',
    featured: true,
  },
];

// -------------------------------------------------------------
// EVENT SERVICES (Section 14 & 2)
// -------------------------------------------------------------
export const SERVICES: ServiceData[] = [
  {
    id: 'srv-1',
    name: 'Complete Event Management',
    slug: 'complete-management',
    shortDescription: 'Full turnkey conceptualization, scheduling, vendor coordination, and precision execution.',
    fullDescription: 'From the initial concept meeting to the teardown of the last light, our senior production team coordinates every dimension so you can enjoy your occasion entirely stress-free.',
    features: ['Dedicated Event Director', 'Master Timeline & Budget Control', 'Vendor Procurement & Supervision', 'On-Site Crisis Contingency'],
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-2',
    name: 'Stage Decoration & Floral Art',
    slug: 'decoration-and-design',
    shortDescription: 'Architectural mandaps, bespoke imported floral installations, and thematic spatial design.',
    fullDescription: 'We transform raw spaces into ethereal environments using exotic florals, handcrafted fabric draperies, and sculptural stage arches.',
    features: ['3D Spatial Pre-visualizations', 'Exotic Floral Sourcing', 'Custom Thematic Sets', 'Eco-friendly Luxury Materials'],
    icon: 'Flower2',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-3',
    name: 'Intelligent Lighting & Stage Design',
    slug: 'stage-and-lighting',
    shortDescription: 'Concert-grade moving heads, ambient architectural uplighting, and laser beam arrays.',
    fullDescription: 'Illumination shapes the mood. Our lighting designers engineer dynamic scenes that seamlessly shift from emotional ceremonies into high-voltage dance parties.',
    features: ['DMX Controlled Moving Beams', 'Warm Kinetic Filament Drops', 'Architectural Building Washes', 'Laser & Pyrotechnic Sync'],
    icon: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-4',
    name: 'Concert Sound & Audio/Visual',
    slug: 'sound-and-av',
    shortDescription: 'Line-array acoustic clarity, massive LED video walls, and live multi-camera broadcast.',
    fullDescription: 'Pristine sound engineering paired with high-pitch LED screens ensuring every seat experiences clear visuals and thumping musical fidelity.',
    features: ['Line Array Sound Systems', '4K P2.5 Indoor/Outdoor LED Walls', 'Digital Audio Mixing Consoles', 'Live Video Switchers'],
    icon: 'Radio',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-5',
    name: 'Cinematography & Drone Production',
    slug: 'photography-videography',
    shortDescription: 'Editorial candid photography, cinematic 4K film trailers, and aerial drone captures.',
    fullDescription: 'Every sacred vow, tear of joy, and wild dance move captured by acclaimed visual artists using cinema cameras and gimbal stabilization.',
    features: ['Same-day Edit Teaser Reels', '4K Drone Aerial Shoots', 'Fine Art Leather Bound Albums', 'Candid Editorial Master Photographers'],
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-6',
    name: 'Catering & Gastronomy Curation',
    slug: 'catering',
    shortDescription: 'Gourmet multi-cuisine live culinary stations, celebrity chef menus, and sommelier bars.',
    fullDescription: 'A feast for all senses. We curate world-class food experiences ranging from royal regional thalis to avant-garde international grazing tables.',
    features: ['Live Interactive Chef Counters', 'Artisanal Cocktail & Mocktail Bars', 'Custom Dietary Protocols', 'Fine Bone China & Linen Styling'],
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-7',
    name: 'DJ, Live Bands & Entertainment',
    slug: 'dj-and-entertainment',
    shortDescription: 'Celebrity DJs, classical fusion symphonies, brass bands, and energetic international acts.',
    fullDescription: 'Music is the soul of every celebration. We curate top-tier recording artists, percussionists, and club DJs to keep energy peaking.',
    features: ['Celebrity DJ Roster', 'Symphonic Live Bands', 'Acrobatic & Themed Performers', 'Interactive MCs & Anchors'],
    icon: 'Music',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-8',
    name: 'Celebrity & Artist Management',
    slug: 'artist-management',
    shortDescription: 'A-list celebrity bookings, private rider hospitality, and VIP security protocols.',
    fullDescription: 'Direct access to Bollywood icons, national music stars, and international performers with airtight security and hospitality riders.',
    features: ['Contract & Rider Negotiations', 'VIP Green Room Hospitality', 'Armed & Unarmed Security Escorts', 'Logistical Transit Oversight'],
    icon: 'Star',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-9',
    name: 'Luxury Venue Procurement',
    slug: 'venue-arrangement',
    shortDescription: 'Heritage palaces, luxury beachfront resorts, and exclusive private estate buyouts.',
    fullDescription: 'We negotiate and secure breathtaking venues across India and international destination hotspots, ensuring prime dates and favorable terms.',
    features: ['Palace & Heritage Estate Relations', 'Destination Flight & Stay Charters', 'Exclusive Island Bookings', 'Site Inspection & Feasibility'],
    icon: 'Castle',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'srv-10',
    name: 'Guest Hospitality & RSVP Management',
    slug: 'guest-management',
    shortDescription: 'Digital RSVP portals, airport VIP reception desks, and concierge guest assistance.',
    fullDescription: 'Your guests receive white-glove treatment from the moment they step off the plane with branded welcome hampers, fleet transit, and dedicated hotlines.',
    features: ['Dedicated Concierge Helpdesk', 'Luggage Tagging & Porterage', 'Branded Welcome Kits', 'Real-time Transport Dispatch'],
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  },
];

// -------------------------------------------------------------
// OUR WORK PROJECTS (Section 16)
// -------------------------------------------------------------
export const WORK_PROJECTS: WorkProjectData[] = [
  {
    id: 'proj-1',
    title: 'The Royal Falaknuma Wedding',
    slug: 'royal-falaknuma-wedding-hyderabad',
    category: 'Weddings',
    location: 'Hyderabad',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isFeatured: true,
    guestCount: 650,
    servicesProvided: ['Complete Management', 'Floral Mandap', 'Intelligent Lighting', 'Catering'],
  },
  {
    id: 'proj-2',
    title: 'Celestial 50th Jubilee Gala',
    slug: 'celestial-jubilee-bangalore',
    category: 'Birthdays',
    location: 'Bangalore',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isFeatured: true,
    guestCount: 300,
    servicesProvided: ['DJ & Sound', 'Stage Design', 'Cinematography'],
  },
  {
    id: 'proj-3',
    title: 'Global Tech Innovation Summit',
    slug: 'global-tech-summit-mumbai',
    category: 'Corporate',
    location: 'Mumbai',
    date: 'December 2025',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isFeatured: true,
    guestCount: 1200,
    servicesProvided: ['AV Production', 'Keynote Stage', 'Branded Lounge'],
  },
  {
    id: 'proj-4',
    title: 'Echoes Arena Music Festival',
    slug: 'echoes-arena-concert-delhi',
    category: 'Concerts',
    location: 'Delhi',
    date: 'November 2025',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isFeatured: true,
    guestCount: 8500,
    servicesProvided: ['Line Array Sound', 'Laser Beams', 'Artist Management'],
  },
  {
    id: 'proj-5',
    title: 'Sunset Coastline Sundowner',
    slug: 'sunset-coastline-goa',
    category: 'Private',
    location: 'Goa',
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    isFeatured: true,
    guestCount: 150,
    servicesProvided: ['Beachside Lighting', 'Artisanal Bar', 'Live Percussion'],
  },
  {
    id: 'proj-6',
    title: 'Imperial Palace Destination Sangeet',
    slug: 'imperial-palace-sangeet-udaipur',
    category: 'Weddings',
    location: 'Udaipur',
    date: 'September 2025',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    isFeatured: false,
    guestCount: 450,
    servicesProvided: ['Stage Decor', 'Royal Hospitality', 'Choreography AV'],
  },
];

// -------------------------------------------------------------
// CUSTOMER REVIEWS (Section 21)
// Note: Marked as demo development data as mandated.
// -------------------------------------------------------------
export const REVIEWS: ReviewData[] = [
  {
    id: 'rev-1',
    customerName: 'Ananya & Vikram Singhania',
    role: 'Bride & Groom',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    reviewText: 'MOMENTA took our wedding dream and elevated it to cinematic heights. The floral mandap over the water looked straight out of a royal fairytale. Their precision and attention to every guest was extraordinary.',
    eventTitle: '3-Day Destination Wedding',
    location: 'Hyderabad',
    date: 'February 2026',
    isDemo: true,
  },
  {
    id: 'rev-2',
    customerName: 'Rajesh Mehra',
    role: 'VP Corporate Relations, Apex Global',
    customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    reviewText: 'Managing our 1,200-delegate tech summit with zero audio latency, flawless 4K video switching, and pristine VIP lounge decor was a masterclass in professional event management. We have locked them for all future summits.',
    eventTitle: 'Global Technology Summit',
    location: 'Mumbai',
    date: 'December 2025',
    isDemo: true,
  },
  {
    id: 'rev-3',
    customerName: 'Dr. Priya & Siddharth Kulkarni',
    role: 'Hosts',
    customerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    reviewText: 'Our golden jubilee anniversary felt intimate yet profoundly grand. From the custom nostalgic timeline gallery to the acoustic jazz trio, MOMENTA designed memories that our family will treasure for generations.',
    eventTitle: 'Golden Jubilee Celebration',
    location: 'Bangalore',
    date: 'January 2026',
    isDemo: true,
  },
  {
    id: 'rev-4',
    customerName: 'Kabir Oberoi',
    role: 'Music Producer & Festival Promoter',
    customerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    reviewText: 'The stage acoustics and moving lighting arrays for our stadium show were sheer perfection. MOMENTA’s technical production crew operates with the finesse of international touring engineers.',
    eventTitle: 'Echoes Live Concert',
    location: 'Delhi',
    date: 'November 2025',
    isDemo: true,
  },
];

// -------------------------------------------------------------
// DYNAMIC STATISTICS (Section 26)
// -------------------------------------------------------------
export const SITE_STATS: StatData[] = [
  {
    id: 'stat-1',
    value: '500+',
    label: 'Events Managed',
    sublabel: 'Flawlessly planned & produced across India',
  },
  {
    id: 'stat-2',
    value: '300+',
    label: 'Happy Clients',
    sublabel: 'Families, corporations & artists who trust us',
  },
  {
    id: 'stat-3',
    value: '5+',
    label: 'Years of Experience',
    sublabel: 'Setting luxury benchmarks in event design',
  },
  {
    id: 'stat-4',
    value: '99.8%',
    label: 'On-Time Execution',
    sublabel: 'Airtight logistical scheduling & delivery',
  },
];
