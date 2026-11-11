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
  galleryImages?: string[];
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
  verifiedSource?: string;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  isDemo: boolean;
}

// -------------------------------------------------------------
// EVENT CATEGORIES (16 Signature Categories)
// -------------------------------------------------------------
export const EVENT_CATEGORIES: EventCategoryData[] = [
  {
    id: 'cat-1',
    name: 'Weddings',
    slug: 'weddings',
    tagline: 'Timeless Grandeur',
    description: 'Bespoke royal weddings, destination mandaps, and lavish celebratory receptions.',
    image: '/wedding-card.jpg',
    icon: 'HeartHandshake',
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Engagements',
    slug: 'engagements',
    tagline: 'The First Promise',
    description: 'Intimate candlelit rings, opulent floral backdrops, and unforgettable cocktail soirées.',
    image: '/events/engagements.jpg',
    icon: 'Sparkles',
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Birthdays',
    slug: 'birthdays',
    tagline: 'Milestone Celebrations',
    description: 'Extravagant 1st birthdays, luxury sweet 16s, and majestic golden jubilee galas.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=2400&q=85',
    icon: 'Cake',
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'Anniversaries',
    slug: 'anniversaries',
    tagline: 'Enduring Legacies',
    description: 'Silver and golden jubilee celebrations with cinematic vow renewals and candlelit dining.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2400&q=85',
    icon: 'Wine',
    featured: true,
  },
  {
    id: 'cat-5',
    name: 'Corporate Events',
    slug: 'corporate-events',
    tagline: 'Executive Precision',
    description: 'Global summits, annual corporate galas, and world-class shareholder banquets.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2400&q=85',
    icon: 'Briefcase',
    featured: true,
  },
  {
    id: 'cat-6',
    name: 'Concerts & Live Shows',
    slug: 'concerts-live-shows',
    tagline: 'Acoustic Mastery',
    description: 'Stadium arena tours, live artist concerts, and immersive electronic music festivals.',
    image: '/party.jpg',
    icon: 'Music2',
    featured: true,
  },
  {
    id: 'cat-7',
    name: 'College Events',
    slug: 'college-events',
    tagline: 'Youthful Momentum',
    description: 'Mega university cultural fests, star-studded DJ nights, and inter-collegiate festivals.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2400&q=85',
    icon: 'GraduationCap',
    featured: true,
  },
  {
    id: 'cat-8',
    name: 'School Events',
    slug: 'school-events',
    tagline: 'Inspired Milestones',
    description: 'Grand annual day celebrations, sports days, and student graduation ceremonies.',
    image: '/events/school-events.jpg',
    icon: 'School',
    featured: false,
  },
  {
    id: 'cat-9',
    name: 'Private Parties',
    slug: 'private-parties',
    tagline: 'Exclusive Discretion',
    description: 'Luxury villa parties, penthouse gatherings, and private DJ sundowners.',
    image: '/private-party.png',
    icon: 'GlassWater',
    featured: true,
  },
  {
    id: 'cat-10',
    name: 'Baby Showers',
    slug: 'baby-showers',
    tagline: 'Tender Beginnings',
    description: 'Pastel dreamscapes, custom floral swings, and heartfelt maternity festivities.',
    image: '/events/baby-showers.jpg',
    icon: 'Smile',
    featured: false,
  },
  {
    id: 'cat-11',
    name: 'Naming Ceremonies',
    slug: 'naming-ceremonies',
    tagline: 'Sacred Blessings',
    description: 'Traditional cradle ceremonies with celestial decor and curated familial feasts.',
    image: '/events/naming-ceremonies.jpg',
    icon: 'Sun',
    featured: false,
  },
  {
    id: 'cat-12',
    name: 'Cultural Events',
    slug: 'cultural-events',
    tagline: 'Heritage Celebrations',
    description: 'Folk performances, regional festivals, and authentic cultural showcases.',
    image: '/events/cultural-events.jpg',
    icon: 'Globe2',
    featured: true,
  },
  {
    id: 'cat-13',
    name: 'Religious Events',
    slug: 'religious-events',
    tagline: 'Divine Serenity',
    description: 'Devotional kirtans, temple ceremonies, and spiritual congregational gatherings.',
    image: '/events/religious-events.jpg',
    icon: 'Flame',
    featured: false,
  },
  {
    id: 'cat-14',
    name: 'Award Functions',
    slug: 'award-functions',
    tagline: 'Golden Accolades',
    description: 'Red carpet entries, trophy presentations, and high-impact stage productions.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=85',
    icon: 'Trophy',
    featured: true,
  },
  {
    id: 'cat-15',
    name: 'Exhibitions & Expos',
    slug: 'exhibitions',
    tagline: 'Curated Showcases',
    description: 'Art gallery installations, industrial trade shows, and bespoke luxury expos.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2400&q=85',
    icon: 'Grid3X3',
    featured: false,
  },
  {
    id: 'cat-16',
    name: 'Brand Activations',
    slug: 'brand-activations',
    tagline: 'Experiential Reach',
    description: 'Interactive consumer pop-ups, immersive brand zones, and viral PR setups.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2400&q=85',
    icon: 'Target',
    featured: false,
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
// Authentic HappyEvents Portfolio Projects
// -------------------------------------------------------------
export const WORK_PROJECTS: WorkProjectData[] = [
  {
    id: 'proj-1',
    title: 'Reception Stage & Floral Arc Decor',
    slug: 'reception-stage-decor-hyderabad',
    category: 'Weddings',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: '/wedding-card.jpg',
    galleryImages: ['/wedding-card.jpg', '/wedding-2.png', '/wedding.jpg'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isFeatured: true,
    guestCount: 650,
    servicesProvided: ['Floral Mandap & Stage', 'Architectural Backdrop', 'Ambient Lighting', 'Turnkey Production'],
  },
  {
    id: 'proj-2',
    title: 'Bespoke Traditional Mandapam Set',
    slug: 'mandapam-set-decor-hyderabad',
    category: 'Weddings',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: '/wedding-2.png',
    galleryImages: ['/wedding-2.png', '/wedding.jpg', '/wedding-card.jpg'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isFeatured: true,
    guestCount: 500,
    servicesProvided: ['Custom Mandap Design', 'Exotic Floral Art', 'Vedic Ceremony Layout', 'Lighting Synchrony'],
  },
  {
    id: 'proj-3',
    title: 'Vibrant Sangeet & Haldi Ceremony Decor',
    slug: 'sangeet-haldi-ceremony-hyderabad',
    category: 'Weddings',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: '/wedding.jpg',
    galleryImages: ['/wedding.jpg', '/wedding-card.jpg'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isFeatured: true,
    guestCount: 350,
    servicesProvided: ['Haldi Stage Decor', 'Sangeet Lighting Array', 'Floral Installations', 'Festive Ambiance'],
  },
  {
    id: 'proj-4',
    title: 'Stadium Concert & Intelligent Lighting Production',
    slug: 'concert-lighting-stage-production',
    category: 'Concerts',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: '/party.jpg',
    galleryImages: ['/party.jpg'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isFeatured: true,
    guestCount: 5000,
    servicesProvided: ['Moving Head Beams', 'Line-Array Audio Support', 'Mega Stage Trussing', 'Artist Staging'],
  },
  {
    id: 'proj-5',
    title: 'Exclusive Sunset Villa Soirée',
    slug: 'sunset-villa-private-party',
    category: 'Private',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: '/private-party.png',
    galleryImages: ['/private-party.png'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    isFeatured: true,
    guestCount: 120,
    servicesProvided: ['Private Estate Transformation', 'Cocktail Lounge Illumination', 'Ambient Floral Styling'],
  },
  {
    id: 'proj-6',
    title: 'Daughter\'s Milestone Birthday Celebration',
    slug: 'milestone-birthday-celebration',
    category: 'Birthdays',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80', '/wedding-card.jpg'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    isFeatured: false,
    guestCount: 200,
    servicesProvided: ['Themed Stage Decor', 'Dessert Tables', 'Interactive Lighting', 'Guest Seating'],
  },
  {
    id: 'proj-7',
    title: 'Corporate Leadership Summit & Gala',
    slug: 'corporate-leadership-summit',
    category: 'Corporate',
    location: 'Hyderabad',
    date: 'Recent Production',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: false,
    guestCount: 800,
    servicesProvided: ['Keynote Stage AV', 'Executive Lounge Decor', 'Precision Timing', 'VIP Hospitality'],
  },
];

// -------------------------------------------------------------
// CUSTOMER REVIEWS (Section 21)
// Verified Genuine Reviews from WedMeGood Profile:
// https://www.wedmegood.com/profile/happy-events--1607934/reviews
// -------------------------------------------------------------
export const REVIEWS: ReviewData[] = [
  {
    id: 'rev-wmg-1',
    customerName: 'Rekha Rathod',
    role: 'Bride',
    customerPhoto: '',
    rating: 5,
    reviewText: 'George and team made our engagement day memorable with beautiful decor. The team understood our requirement very well and brought our imagination into reality. Everyone in our family loved the floral backdrop and ambient lighting.',
    eventTitle: 'Engagement Ceremony',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-2',
    customerName: 'Annie',
    role: 'Parent & Host',
    customerPhoto: '',
    rating: 5,
    reviewText: 'Happy Events gave a beautiful decor to our daughter\'s Birthday Event. The output was splendid. George took care of each detail we specified. They handed over the place on time and we received great appreciation from all our guests. Thank you guys.',
    eventTitle: 'Daughter\'s Birthday Event',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-3',
    customerName: 'Sai Karthik Velu',
    role: 'Groom',
    customerPhoto: '',
    rating: 5,
    reviewText: 'It was an incredible experience with Happy Events! From the very beginning, their team was attentive, creative, and genuinely invested in making our Sangeet and Haldi ceremonies absolutely unforgettable. The Sangeet was a vibrant, joyful explosion of colour and music, and Happy Events handled every detail flawlessly. What impressed us most was the team\'s professionalism and enthusiasm.',
    eventTitle: 'Sangeet & Haldi Ceremonies',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-4',
    customerName: 'Soumya Polisetty',
    role: 'Bride',
    customerPhoto: '',
    rating: 5,
    reviewText: 'You look at the reference pictures from your wedding venue and you look at the decor, and assume it’s way out of your budget, but Happy Events pleasantly surprises you. I could completely relax the 2 days we had our events, only because George was the planner. Extremely efficient, quick instincts, and very accommodating. Trust George and Happy Events for a seamless wedding day.',
    eventTitle: 'Wedding Decor & Coordination',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-5',
    customerName: 'Kali',
    role: 'Groom',
    customerPhoto: '',
    rating: 5,
    reviewText: 'We had the absolute pleasure of working with George and Happy Events for our wedding. From start to finish, they handled everything seamlessly. Their calm execution, punctuality, and grand decor setups made our special day effortless and stunning.',
    eventTitle: 'Wedding Celebration',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-6',
    customerName: 'Vimal Sharma',
    role: 'Father of the Groom',
    customerPhoto: '',
    rating: 5,
    reviewText: 'Recently, for my son’s wedding, I availed the services of Happy Events. Their work included beautiful decorations, highly cost-effective value, and punctual delivery. Highly recommended for any family celebration.',
    eventTitle: 'Son\'s Wedding Celebration',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-7',
    customerName: 'Siddharth Sharma',
    role: 'Host',
    customerPhoto: '',
    rating: 5,
    reviewText: 'George and team did a fantastic job. Attention to detail and colour combinations in decorations were fantastic. Overall it was worth the money and trust.',
    eventTitle: 'Wedding & Reception Decor',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-8',
    customerName: 'Pavithra Mannava',
    role: 'Host',
    customerPhoto: '',
    rating: 5,
    reviewText: 'We were so happy choosing Happy Events for my sister\'s baby shower event. They have an excellent team who does everything in detail to provide the best festive ambiance.',
    eventTitle: 'Baby Shower Event',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-9',
    customerName: 'Sanskrithi',
    role: 'Bride',
    customerPhoto: '',
    rating: 5,
    reviewText: 'One word: Excellent! We hired George at the 11th hour after other wedding planners had shown incompetence. George stepped in, handled everything with great poise and delivery, and turned our wedding into pure magic.',
    eventTitle: 'Wedding Planning & Production',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-10',
    customerName: 'Sarika Yalamanchili',
    role: 'Host',
    customerPhoto: '',
    rating: 5,
    reviewText: 'The Happy Events team has been very thorough in the execution of our event. They were always prompt in answering our questions and delivered exactly what was promised with elegance.',
    eventTitle: 'Family Celebration',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-11',
    customerName: 'Sharmin Lakhani',
    role: 'Wedding Guest & Organizer',
    customerPhoto: '',
    rating: 5,
    reviewText: 'I had the pleasure of working with Mr. George from Happy Events for my friend\'s wedding, and I can\'t express enough how thrilled I am with his coordination, creative ideas, and dedication throughout the ceremonies.',
    eventTitle: 'Wedding Coordination',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
  {
    id: 'rev-wmg-12',
    customerName: 'Caroline Ann',
    role: 'Bride',
    customerPhoto: '',
    rating: 5,
    reviewText: 'We reached out to Happy Events for our marriage reception and had such a wonderful experience. Everything went as per plan, the decor looked regal, and George took personal care of the stage arrangement.',
    eventTitle: 'Marriage Reception',
    location: 'Hyderabad',
    date: 'Verified Client',
    isDemo: false,
    verifiedSource: 'WedMeGood Verified Review',
  },
];

// -------------------------------------------------------------
// TEAM (About Page)
// Note: Marked as demo development data as mandated.
// -------------------------------------------------------------
export const TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: 'team-1',
    name: 'Founder & Creative Director',
    role: 'Founder & Creative Director',
    photo:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Leads the overall vision for every celebration, from first concept sketch to final send-off.',
    isDemo: true,
  },
  {
    id: 'team-2',
    name: 'Head of Production',
    role: 'Head of Production',
    photo:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    bio: 'Runs the on-ground crew, timelines, and technical logistics for every event day.',
    isDemo: true,
  },
  {
    id: 'team-3',
    name: 'Lead Décor & Floral Designer',
    role: 'Lead Décor & Floral Designer',
    photo:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Shapes the visual identity of every mandap, stage, and venue transformation.',
    isDemo: true,
  },
  {
    id: 'team-4',
    name: 'Client Relations Manager',
    role: 'Client Relations Manager',
    photo:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'The first and last point of contact — keeping every client informed and reassured.',
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
