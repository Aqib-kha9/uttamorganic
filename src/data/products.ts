export interface Product {
  id: string;
  name: string;
  category: 'Fertilizers' | 'Pesticides' | 'Fungicides' | 'Herbicides' | 'Combos' | 'Plant Growth Regulators';
  subcategory?: string;
  description: string;
  composition: string;
  benefits: string[];
  recommendedUsage: string;
  packagingDetails: string[];
  originalPrice: number;
  currentPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string; // We can use elegant styling or SVGs instead of broken image links
  isSoldOut?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "humic-fulvic-acid-98-drum",
    name: "Greengrow Activated Humic Acid + Fulvic Acid 98% (Drum Packing)",
    category: "Fertilizers",
    subcategory: "Organic Soil Conditioner",
    description: "Greengrow Humic and Fulvic Acid 98% is a premium organic soil conditioner designed to improve soil aeration, enhance root growth, and maximize nutrient absorption from the soil.",
    composition: "Humic Acid: 80%, Fulvic Acid: 18%, K2O: 12% (Water Soluble Active Extracts)",
    benefits: [
      "Accelerates root development and plant metabolism.",
      "Improves soil structure and water-holding capacity.",
      "Acts as a natural chelating agent, facilitating high nutrient intake."
    ],
    recommendedUsage: "Soil Application: 2-3 kg per acre. Foliar Spray: 1-2 grams per liter of water. Drip Irrigation: 1.5 kg per acre.",
    packagingDetails: ["25 KG DRUM", "35 KG DRUM"],
    originalPrice: 22500,
    currentPrice: 6750,
    discount: 70,
    rating: 4.8,
    reviews: 80,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "bhumiraja-mycorrhiza",
    name: "Greengrow Bhumiraja Mycorrhiza Biofertilizer",
    category: "Fertilizers",
    subcategory: "Biofertilizers",
    description: "A highly concentrated Vesicular Arbuscular Mycorrhiza (VAM) formulation. It builds a symbiotic association with plant roots, expanding root surface area by up to 100 times to absorb critical minerals and water.",
    composition: "Mycorrhiza Spores: 100 spores/gm, Active Carrier Clay: 98%",
    benefits: [
      "Unlocks fixed phosphorus in the soil and supplies it to plants.",
      "Reduces drought stress and builds resilience against root pathogens.",
      "Promotes deep white root development, leading to uniform crop growth."
    ],
    recommendedUsage: "Broadcast 4 kg per acre during sowing or transplanting. Mix well with soil or organic manure.",
    packagingDetails: ["1 KG", "4 KG", "8 KG", "20 KG", "25 KG"],
    originalPrice: 790,
    currentPrice: 364,
    discount: 53,
    rating: 4.9,
    reviews: 1117,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "seaweed-extract-liquid",
    name: "Greengrow Seaweed Extract Liquid Organic Fertilizer",
    category: "Fertilizers",
    subcategory: "Liquid Growth Promoters",
    description: "Pure cold-water kelp extract rich in natural plant hormones (auxins, cytokinins, gibberellins), micronutrients, and amino acids to boost overall crop yields.",
    composition: "Seaweed Extract (Ascophyllum nodosum): 20% w/v, Organic Carbon: 15%",
    benefits: [
      "Stimulates vegetative growth, flowering, and fruit-setting.",
      "Improves crop quality, color, weight, and shelf-life of produce.",
      "Acts as an anti-stress shield against extreme heat or cold weather."
    ],
    recommendedUsage: "Foliar Spray: 2-3 ml per liter of water during vegetative, flowering, and fruiting stages. Drip: 1 Liter per acre.",
    packagingDetails: ["250 ML", "500 ML", "1 L", "5 L", "10 L", "20 L"],
    originalPrice: 398,
    currentPrice: 256,
    discount: 35,
    rating: 4.7,
    reviews: 176,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "npk-19-19-19",
    name: "Greengrow NPK 19:19:19 100% Water Soluble Fertilizer",
    category: "Fertilizers",
    subcategory: "N-P-K Solubles",
    description: "A balanced NPK fertilizer containing Nitrogen, Phosphorus, and Potassium in equal proportions. Ideal for early vegetative growth and establishing strong foundations in all crops.",
    composition: "Total Nitrogen (N): 19%, Phosphorus (P2O5): 19%, Potassium (K2O): 19%",
    benefits: [
      "Provides rapid, balanced nutrition directly to the leaves.",
      "Enhances leaf greenness (chlorophyll development) and stem strength.",
      "100% soluble, suitable for drip systems, sprinkler systems, and sprayers."
    ],
    recommendedUsage: "Foliar Spray: 5-8 grams per liter of water. Drip Irrigation: 3-5 kg per acre depending on crop stage.",
    packagingDetails: ["1 KG", "3 KG", "5 KG", "10 KG", "25 KG"],
    originalPrice: 664,
    currentPrice: 330,
    discount: 50,
    rating: 4.6,
    reviews: 128,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "antivirus-viricide",
    name: "Greengrow Antivirus Viricide (Broad Spectrum)",
    category: "Pesticides",
    subcategory: "Bio-Viricide",
    description: "An innovative natural viricide designed to manage leaf curl virus, mosaic virus, and other crop viral infections by enhancing systemic acquired resistance.",
    composition: "Plant Alkaloids: 10%, Organic Acids: 5%, Surfactant: 2%",
    benefits: [
      "Effectively prevents Leaf Curl Virus in Chilli, Tomato, and Brinjal.",
      "Stops the spread of active viral infections to healthy plant tissues.",
      "Non-toxic, residue-free bio-formulation suitable for export crops."
    ],
    recommendedUsage: "Foliar Spray: 2.5 ml per liter of water. Repeat spray after 7-10 days for active infection control.",
    packagingDetails: ["250 ML", "500 ML", "1 L", "5 L"],
    originalPrice: 741,
    currentPrice: 327,
    discount: 53,
    rating: 4.8,
    reviews: 1260,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "chakraveer-chlorantraniliprole",
    name: "Greengrow Chakraveer (Chlorantraniliprole 18.5% SC)",
    category: "Pesticides",
    subcategory: "Chemical Insecticide",
    description: "A highly effective insecticide offering long-duration control against lepidopteran pests, including stem borer, fruit borer, and diamondback moth.",
    composition: "Chlorantraniliprole: 18.5% SC w/w",
    benefits: [
      "Targeted action against borers and leaf-eating caterpillars.",
      "Provides crop protection for up to 15-20 days after application.",
      "Safe for beneficial predatory insects when used as recommended."
    ],
    recommendedUsage: "Foliar Spray: 0.4 ml per liter of water (approx. 60-80 ml per acre in 200 liters of water).",
    packagingDetails: ["60 ML", "150 ML", "300 ML", "600 ML"],
    originalPrice: 1150,
    currentPrice: 440,
    discount: 61,
    rating: 4.9,
    reviews: 1135,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "azodharma-fungicide",
    name: "Greengrow Azodharma Broad Spectrum Fungicide",
    category: "Fungicides",
    subcategory: "Systemic Fungicide",
    description: "A power-packed blend of Azoxystrobin and Difenoconazole, offering dual systemic action to treat and prevent early blight, powdery mildew, and anthracnose.",
    composition: "Azoxystrobin: 18.2% + Difenoconazole: 11.4% SC",
    benefits: [
      "Broad spectrum protection for fruit, vegetable, and field crops.",
      "Dual action: prevents spore germination and halts fungal growth.",
      "Fast penetration with excellent rainfastness properties."
    ],
    recommendedUsage: "Foliar Spray: 1 ml per liter of water (150-200 ml per acre).",
    packagingDetails: ["100 ML", "250 ML", "500 ML", "1 L", "5 L"],
    originalPrice: 685,
    currentPrice: 310,
    discount: 54,
    rating: 4.8,
    reviews: 287,
    image: "/assets/product_1.jpeg"
  },
  {
    id: "cotton-suraksha-combo",
    name: "Greengrow Cotton Suraksha Combo (Soil Application)",
    category: "Combos",
    subcategory: "Crop Combos",
    description: "Complete soil application kit containing organic growth boosters and biological root protection agents, specifically formulated for cotton crops.",
    composition: "Bhumiraja Mycorrhiza (4KG) + Activated Humic Acid (800G) + Micronutrient Mix (500G)",
    benefits: [
      "Ensures rapid seedling establishment and taproot development.",
      "Shields the young cotton plants from soil-borne fungal pathogens.",
      "Supplies critical trace minerals required during the first 30 days."
    ],
    recommendedUsage: "Mix the entire combo package contents and apply as a soil application for 1 acre at sowing or first weeding.",
    packagingDetails: ["1 Pack (Covers 1 Acre)"],
    originalPrice: 4677,
    currentPrice: 1700,
    discount: 63,
    rating: 4.9,
    reviews: 92,
    image: "/assets/product_1.jpeg"
  }
];

export const CROPS = [
  { name: "Tomato", icon: "🍅", desc: "Early Blight, Powdery Mildew, Fruit Borer" },
  { name: "Cotton", icon: "🌱", desc: "Cutworm, Pink Bollworm, Wilt Protection" },
  { name: "Paddy", icon: "🌾", desc: "Stem Borer, Blast Fungus, Leaf Folder" },
  { name: "Chilli", icon: "🌶️", desc: "Mites, Whitefly, Leaf Curl Virus" },
  { name: "Sugarcane", icon: "🎋", desc: "Internode Borer, Red Rot prevention" },
  { name: "Wheat", icon: "🌾", desc: "Rust Disease, Termite control, Grain Weight" },
  { name: "Brinjal", icon: "🍆", desc: "Fruit & Shoot Borer, Jassids" },
  { name: "Mango", icon: "🥭", desc: "Powdery Mildew, Fruit Drop, Anthracnose" }
];

export const CATEGORIES = [
  { name: "Fertilizers", count: 18, desc: "Organic, NPK Solubles, Micronutrients & Biofertilizers", color: "from-green-600 to-emerald-700" },
  { name: "Pesticides", count: 14, desc: "Chemical Insecticides, Organic Pest Repellers & Bio-Viricides", color: "from-amber-600 to-yellow-700" },
  { name: "Fungicides", count: 10, desc: "Systemic, Contact and Bio-Fungicides for crop safety", color: "from-blue-600 to-cyan-700" },
  { name: "Herbicides", count: 6, desc: "Selective and Non-selective Weed Killers", color: "from-teal-600 to-emerald-800" },
  { name: "Combos", count: 8, desc: "Super Saver Crop Solutions and stage-specific sprays", color: "from-orange-600 to-red-600" }
];
