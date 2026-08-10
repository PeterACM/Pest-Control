import { ServiceItem, BlogArticle, Testimonial } from '../types';

export const BUSINESS_INFO = {
  name: "Pest Free Services",
  tradeName: "Pest Free Services",
  founder: "Grant Arnold",
  legalForm: "Private Corporation (Pty)",
  regNumber: "B2011063958",
  incorporatedYear: "2011",
  address: "24 Kensington Gardens, Umbilo, Durban, 4001, KwaZulu-Natal",
  phone: "031 205 3371",
  landline: "031 205 3371",
  mobile: "082 798 6705",
  email: "pestfreeservice@gmail.com",
  hours: "Mon - Sat: 07:30 - 17:30 | Emergency Response Available",
  stats: {
    yearsInBusiness: "14+",
    householdsServed: "650+",
    licensing: "P36112 Dept. of Agriculture Licensed",
    specialty: "Targeted Roach Gel Control"
  }
};

export const DURBAN_SUBURBS = [
  "Umbilo",
  "North Beach",
  "South Beach",
  "Morningside",
  "Durban North",
  "Umhlanga",
  "Musgrave",
  "Glenwood",
  "Westville",
  "Kloof",
  "Hillcrest",
  "Pinetown",
  "Berea",
  "La Lucia",
  "Amanzimtoti",
  "Ballito"
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "wood-borer",
    name: "Wood-Borer Control",
    category: "pest",
    iconName: "ShieldAlert",
    shortDesc: "The effective alternative to fumigation using Dept. of Agriculture licensed products.",
    fullDesc: "Durban's coastal humidity affects timber in roofs, floors, and door frames. Pest Free Services specializes in providing an effective alternative to fumigation using products registered with the Department of Agriculture for borer control. An initial on-site assessment is compulsory to verify timber accessibility and structure. One of our primary licensed products absorbs deep into wood; depending on the product selected, partial evacuation during treatment may be required. If timber is inaccessible (e.g. double-storey void gaps), we refer you to trusted fumigation tenting partners.",
    bioAdvantage: "Compulsory use of registered chemicals. Assessment determines if alternative to fumigation is possible.",
    priceEstimate: "Assessment Required | Property Transfer Inspection Fee Applies",
    isFlagship: true
  },
  {
    id: "termite-control",
    name: "Termite Control (Soil & Structure)",
    category: "pest",
    iconName: "ShieldCheck",
    shortDesc: "Specialized barrier and treatment options for Termite on soil or Termite on structure.",
    fullDesc: "Termite activity manifests as either Termite on soil or Termite on structure. Pest Free Services applies licensed chemical soil barriers and structural timber treatments to stop colony expansion and protect building foundations.",
    bioAdvantage: "Licensed Department of Agriculture chemicals tailored to soil vs structure activity.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "cockroaches",
    name: "Cockroach Control",
    category: "pest",
    iconName: "Bug",
    shortDesc: "Targeted gel baiting with client cleanliness partnership.",
    fullDesc: "Our cockroach gel applications provide targeted, professional control. Successful cockroach control is a true partnership: our technicians apply high-performance gel bait, and residents partner with us by maintaining cleanliness and removing attractions such as stored cardboard boxes, old newspapers, and food debris.",
    bioAdvantage: "High-performance gel backed by active client sanitation partnership.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "rodents",
    name: "Rodent Control",
    category: "pest",
    iconName: "ShieldCheck",
    shortDesc: "High-demand rodent baiting, trapping, and perimeter proofing.",
    fullDesc: "High demand across Durban residential homes and businesses. We install secure tamper-resistant bait stations and entry point proofing to keep premises free of rats and mice.",
    bioAdvantage: "Safe, targeted bait placement away from children and pets.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "ants",
    name: "Ant Colony Control",
    category: "pest",
    iconName: "Footprints",
    shortDesc: "Perimeter barriers and queen-targeting bait matrices.",
    fullDesc: "Targeted control for garden and sugar ants around food prep areas and building perimeters.",
    bioAdvantage: "Effective perimeter application for long-term control.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "bed-bugs",
    name: "Bed Bug Treatment",
    category: "pest",
    iconName: "Bed",
    shortDesc: "Licensed chemical extraction for mattresses, frames, and headboards.",
    fullDesc: "Comprehensive bed bug control using registered products that eliminate bed bugs and eggs from sleeping areas.",
    bioAdvantage: "Targeted application with clear re-entry safety guidelines.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "snakes-geckos",
    name: "Snake & Gecko Control",
    category: "pest",
    iconName: "ShieldCheck",
    shortDesc: "Humane snake relocation, perimeter repellents, and gecko entry proofing.",
    fullDesc: "Durban gardens and roof spaces attract geckos and venomous snakes. Pest Free Services provides prompt, safe snake relocation and perimeter repellents.",
    bioAdvantage: "Safe relocation and entry proofing.",
    priceEstimate: "Assessment Required"
  },
  {
    id: "wood-replacement",
    name: "Sub-Contracted Wood Replacement",
    category: "handyman",
    iconName: "Wrench",
    shortDesc: "Dispatch of trusted sub-contractors for roof, door, window, and floor timber repairs.",
    fullDesc: "When wood-borer or moisture damages timber fixtures, Pest Free Services dispatches trusted, specialized sub-contractors. These experienced timber contractors will inspect and quote directly on replacing damaged roof structures, doors, window frames, and flooring.",
    bioAdvantage: "Dispatched specialist sub-contractors for roof structures, doors, windows & floors.",
    priceEstimate: "Custom Contractor Quote"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    clientName: "Body Corporate Supervisor (Baumann Ave Flats)",
    suburb: "North Beach, Durban",
    quote: "Our block of flats experienced wood-borer activity in structural timber. Pest Free Services assessed the building and applied an effective alternative to fumigation using registered borer control products. The treatment stopped the borer without tenting the entire building, saving our body corporate substantial costs!",
    rating: 5,
    serviceType: "Wood-Borer Treatment",
    year: "Body Corporate Client",
    verifiedBadge: "Licensed Dept. of Agriculture Treatment"
  },
  {
    id: "t2",
    clientName: "David & Sarah K.",
    suburb: "Morningside, Durban",
    quote: "We noticed borer dust under our Oregon pine floors. Pest Free Services did an initial assessment, explained the treatment process clearly, and applied registered borer products. Two years later, our timber floors remain completely sound and protected.",
    rating: 5,
    serviceType: "Wood-Borer Floor Treatment",
    year: "2024"
  },
  {
    id: "t3",
    clientName: "Prashant Naidoo",
    suburb: "Umbilo, Durban",
    quote: "Pest Free Services handled a cockroach issue at our restaurant using professional gel treatment. They gave us clear advice on removing cardboard boxes and maintaining cleanliness, and the results have been fantastic.",
    rating: 5,
    serviceType: "Cockroach Gel Control",
    year: "2025"
  },
  {
    id: "t4",
    clientName: "Jennifer Miller",
    suburb: "Umhlanga Rocks",
    quote: "Living near coastal bush, we needed urgent snake relocation and rodent control. Pest Free Services responded promptly, dispatched an experienced technician, and gave us total peace of mind.",
    rating: 5,
    serviceType: "Snake Relocation & Rodent Control",
    year: "2025"
  },
  {
    id: "t5",
    clientName: "Thabo Mthembu",
    suburb: "Durban North",
    quote: "Pest Free Services provides reliable, professional pest control. Clear communication, SMS confirmation for arrival time, and licensed products. Excellent local Durban company.",
    rating: 5,
    serviceType: "Property Pest Control",
    year: "2026"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "wood-borer-signs-durban",
    title: "Understanding Wood-Borer Control in Durban Properties",
    category: "Wood-Borer & Termite",
    excerpt: "Durban's coastal climate creates conditions for wood-borer. Learn why an on-site assessment is essential to determine the right treatment option.",
    content: [
      "Durban property owners in suburbs like Morningside, Umbilo, or Durban North often encounter wood-borer in floorboards, doors, or roof trusses.",
      "1. Fine Frass or Wood Dust: Tiny piles of flour-like powder beneath wooden beams or furniture indicate borer larvae activity.",
      "2. Exit Holes: Clean 1mm to 2mm circular holes on timber surfaces mean adult borer beetles have emerged.",
      "3. Compulsory Registered Chemicals: South African regulations mandate the use of registered chemical products for wood-borer control to ensure effective absorption and timber protection.",
      "4. The Need for Assessment: An on-site assessment by Pest Free Services is necessary to inspect timber accessibility. If timber structures are accessible, our alternative to fumigation can be applied. If timber is sealed inside inaccessible voids (such as certain double-storey ceiling gaps), we will recommend a trusted tent fumigator.",
      "5. Partial Evacuation: Certain high-absorption borer treatments require partial evacuation during application for safety and optimal product effectiveness."
    ],
    readTime: "4 min read",
    date: "July 12, 2026",
    author: "Pest Free Services",
    tags: ["Wood-Borer", "Durban Homes", "Pest Control", "Timber Assessment"],
    seoDescription: "Learn about wood-borer signs and treatment options in Durban. On-site assessment determines alternative to fumigation suitability."
  },
  {
    id: "cockroach-control-partnership",
    title: "Why Cockroach Control is a Partnership",
    category: "Pest Management",
    excerpt: "How professional roach gel application combined with proper home sanitation achieves lasting results.",
    content: [
      "Cockroach control in humid coastal environments requires more than just applying a product — it relies on a joint partnership between the pest control technician and the property resident.",
      "The Role of Roach Gel: Pest Free Services applies licensed roach gel formulations that target roach harborages and provide targeted control.",
      "The Resident's Role in Success: Cardboard boxes, old newspapers, clutter, and uncleaned food crumbs attract cockroaches and provide nesting materials. To maintain a cockroach-free environment, residents partner with us by removing cardboard, disposing of paper clutter, and sealing food sources.",
      "By working together, our treatment provides strong, reliable protection for your home or business."
    ],
    readTime: "4 min read",
    date: "June 28, 2026",
    author: "Pest Free Services",
    tags: ["Cockroach Control", "Resident Partnership", "Durban Pest Control", "Sanitation"],
    seoDescription: "Discover how Pest Free Services combines roach gel treatment with resident sanitation partnership."
  },
  {
    id: "termite-soil-vs-structure",
    title: "Termite Control: Termite on Soil vs. Termite on Structure",
    category: "Termite Control",
    excerpt: "Understanding the difference between soil activity and structural timber infestation for effective Termite treatment.",
    content: [
      "Termite activity in Durban is generally classified into two main categories: Termite on soil and Termite on structure.",
      "Termite on Soil: Subterranean termites construct mud tubes from ground soil into buildings. Controlling soil activity involves trenching and applying registered termiticides to form an impenetrable chemical soil barrier around foundation walls.",
      "Termite on Structure: Drywood or subterranean termites feeding directly inside wooden door frames, roof trusses, or floorboards require direct structural treatment with licensed preservative formulations.",
      "Pest Free Services conducts thorough on-site assessments for termite control to identify whether your property requires soil barriers, structural treatments, or both."
    ],
    readTime: "4 min read",
    date: "June 15, 2026",
    author: "Pest Free Services",
    tags: ["Termite", "Termite Control", "Soil Treatment", "Structural Protection"],
    seoDescription: "Guide to Termite on soil vs Termite on structure control in Durban. Contact Pest Free Services to request an on-site assessment."
  },
  {
    id: "subcontracted-wood-replacement",
    title: "Restoring Borer-Damaged Roof Structures, Doors & Floors",
    category: "Timber Repairs",
    excerpt: "When timber damage requires replacement, Pest Free Services dispatches specialist sub-contractors.",
    content: [
      "When wood-borer or moisture compromises structural timber, stopping the pest is only step one. Restoring the structural integrity of your building requires experienced timber craft.",
      "Specialist Sub-Contractor Dispatch: Pest Free Services works with trusted, specialized sub-contractors who specialize in timber replacement.",
      "Roof structures, doors, window frames, and timber flooring damaged by borer are thoroughly inspected by our dispatched contractors, who provide a direct, independent quote for repair and replacement.",
      "This ensures your property receives expert timber restoration alongside professional pest control."
    ],
    readTime: "3 min read",
    date: "May 30, 2026",
    author: "Pest Free Services",
    tags: ["Wood Replacement", "Sub-contractors", "Roof Structures", "Timber Repairs"],
    seoDescription: "Learn how Pest Free Services dispatches trusted sub-contractors for timber repairs on roof structures, doors, windows, and floors."
  }
];
