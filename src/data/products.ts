import { assetPath } from "../utils/paths";

export type ProductImage = {
  src: string;
  alt: string;
  tone?: "isolated" | "detail" | "use" | "dark";
};

export type Product = {
  slug: string;
  name: string;
  model: string;
  category: string;
  kitType?: string;
  accent: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  features: string[];
  specifications: Array<[string, string]>;
  relatedProducts: string[];
};

const img = (name: string) => assetPath(`assets/products/${name}`);

export const products: Product[] = [
  {
    slug: "a-ring",
    name: "A-RING",
    model: "A-500",
    category: "High speed air turbine",
    accent: "#d8ad67",
    tagline: "Titanium alloy air turbine with shadowless ring LED.",
    description:
      "A premium ring LED turbine focused on low weight, operating visibility, and zero-retraction infection control.",
    images: [
      { src: img("a-ring-main-cutout.png"), alt: "A-RING handpiece angled product view" },
      { src: img("a-ring-front-cutout.png"), alt: "A-RING frontal product view" },
    ],
    features: [
      "Titanium alloy body, listed as 30% lighter than stainless steel",
      "Shadowless Ring LED with 100-degree design head",
      "100% zero retraction head with double infection control system",
      "High-precision ceramic bearings and dynamic balance cartridge",
    ],
    specifications: [
      ["Model", "A-500"],
      ["Torque", "25W"],
      ["Head Size", "11.2 x H13.25 mm"],
      ["Spray", "4 water spray"],
      ["Air pressure", "0.2-0.3 Mpa"],
      ["Bearings", "NSK ceramic bearings"],
      ["Maximum rotation speed", "330,000-420,000 RPM"],
      ["Body material", "Titanium alloy materials"],
      ["Noise", "<65 dB"],
      ["Disinfection", "Autoclavable not more than 185 C"],
      ["Chucking type", "Push button"],
      ["Connection", "2/4 holes"],
    ],
    relatedProducts: ["a-mup", "a-pro", "a-45"],
  },
  {
    slug: "a-mup",
    name: "A-MUP",
    model: "A-400",
    category: "Mini head air turbine",
    accent: "#37bdf2",
    tagline: "Ultra mini 0.9 mm head with 100-degree angle design.",
    description:
      "A compact turbine designed around expanded operational visibility, flexibility, and fast stopping performance.",
    images: [{ src: img("a-mup-cutout-v2.png"), alt: "A-MUP mini head handpiece product cutout" }],
    features: [
      "Ultra mini head 0.9 mm with 100-degree angle design",
      "Quick stopped in one second",
      "100% zero retraction head with double infection control system",
    ],
    specifications: [
      ["Model", "A-400"],
      ["Torque", "18W"],
      ["Head Size", "9.0 x H10.8 mm"],
      ["Spray", "4 water spray"],
      ["Air pressure", "0.2-0.3 Mpa"],
      ["Bearings", "NSK ceramic bearings"],
      ["Maximum rotation speed", "380,000-420,000 rpm"],
      ["Body material", "Stainless steel"],
      ["Noise", "<65 dB"],
      ["Disinfection", "Autoclavable not more than 135 C"],
      ["Chucking type", "Push button"],
      ["Connection", "2/4 holes"],
    ],
    relatedProducts: ["a-ring", "a-pro", "a-45"],
  },
  {
    slug: "a-pro",
    name: "A-PRO",
    model: "A-300",
    category: "LED air turbine",
    accent: "#b9bec7",
    tagline: "SMD LED turbine with air-water independent system.",
    description:
      "A high speed turbine with LED visibility, improved braking efficiency, and independent air-water cooling.",
    images: [
      { src: img("a-pro-main-cutout.png"), alt: "A-PRO handpiece side product view" },
    ],
    features: [
      "SMD LED with 100-degree design head",
      "Quick stopped in one second",
      "Air-water independent system for cooling and preventing water blockage",
      "100% zero retraction head",
    ],
    specifications: [
      ["Model", "A-300"],
      ["Torque", "23W"],
      ["Head Size", "11.3 x H13.8 mm"],
      ["Spray", "3 water spray"],
      ["Air pressure", "0.2-0.2 Mpa"],
      ["Bearings", "NSK ceramic bearings"],
      ["Maximum rotation speed", "350,000-420,000 RPM"],
      ["Body material", "Titanium head + stainless body"],
      ["Noise", "<65 dB"],
      ["Disinfection", "Autoclavable not more than 135 C"],
      ["Chucking type", "Push button"],
      ["Connection", "2/4 holes"],
    ],
    relatedProducts: ["a-ring", "a-mup", "a-45"],
  },
  {
    slug: "a-45",
    name: "A-45",
    model: "B-45",
    category: "45-degree air turbine",
    accent: "#ff7a2f",
    tagline: "45-degree turbine with rear exhaust and anti-slip body design.",
    description:
      "A warm gold turbine built around rear exhaust, SMD LED, ceramic bearings, and a tactile anti-slip body.",
    images: [
      { src: img("a-45-main-cutout.png"), alt: "A-45 handpiece product side view" },
      { src: img("a-45-use-cutout-v2.png"), alt: "A-45 handpiece held in gloved hand" },
    ],
    features: [
      "100% rear exhaust",
      "Anti-slip body design",
      "SMD LED listed as never damaged after 125 C high temperature sterilization",
      "Japanese ceramic bearings with dynamic balance",
    ],
    specifications: [
      ["Model", "B-45"],
      ["Torque", "21W"],
      ["Head Size", "11 x H13.30"],
      ["Spray", "Triple water spray"],
      ["Air pressure", "0.2-0.2 Mps"],
      ["Bearings", "NSK ceramic bearings"],
      ["Maximum rotation speed", "360,000 RPM"],
      ["Body material", "Copper"],
      ["Noise", "<65 dB"],
      ["Disinfection", "Autoclavable not more than 135 C"],
      ["Chucking type", "Push button"],
      ["Connection", "2/4 holes"],
    ],
    relatedProducts: ["a-pro", "a-ring", "gold-ln"],
  },
  {
    slug: "gold-ln",
    name: "GOLD LN",
    model: "Gold LN",
    category: "Internal water low speed kit",
    kitType: "Internal water",
    accent: "#d99855",
    tagline: "Internal water low speed kit with contra angle, straight handpiece, and air motor.",
    description:
      "A coordinated low speed kit with internal water spray, stainless steel and copper body materials, and NSK ceramic bearings.",
    images: [
      { src: img("gold-ln-kit-cutout.png"), alt: "GOLD LN low speed kit set" },
      { src: img("gold-ln-contra-angle-cutout.png"), alt: "GOLD LN contra angle" },
      { src: img("gold-ln-straight-cutout.png"), alt: "GOLD LN straight handpiece" },
      { src: img("gold-ln-air-motor-cutout.png"), alt: "GOLD LN air motor" },
    ],
    features: [
      "Contra angle with anti-slip body design",
      "Straight handpiece with Japanese ceramic bearings",
      "Air motor with super torque, max torque >65N, and max speed >20,000 RPM",
      "Shorter air motor listed as more efficient and lower noise",
    ],
    specifications: [
      ["Model", "Gold LN"],
      ["Torque", ">65N"],
      ["Air pressure", "0.2-0.3 Mpa"],
      ["Spray", "Internal water spray"],
      ["Maximum rotation speed", "20,000 RPM"],
      ["Bearings", "NSK ceramic bearings"],
      ["Noise", "<65 dB"],
      ["Body material", "Stainless steel + copper"],
      ["Chucking type", "Push button"],
      ["Disinfection", "Autoclavable not more than 135 C"],
    ],
    relatedProducts: ["b-l", "a-45", "a-pro"],
  },
  {
    slug: "b-l",
    name: "B-L",
    model: "Gold L",
    category: "External water low speed kit",
    kitType: "External water",
    accent: "#26bcd7",
    tagline: "External water low speed kit with blue-ringed contra angle, straight handpiece, and air motor.",
    description:
      "A silver low speed kit with external water spray, NSK ceramic bearings, and copper body material.",
    images: [
      { src: img("b-l-kit-cutout.png"), alt: "B-L low speed kit set" },
      { src: img("b-l-contra-angle-cutout.png"), alt: "B-L contra angle" },
      { src: img("b-l-u-contra-angle-cutout.png"), alt: "B-L U contra angle" },
      { src: img("b-l-straight-cutout.png"), alt: "B-L straight handpiece" },
      { src: img("b-l-air-motor-cutout.png"), alt: "B-L air motor" },
    ],
    features: [
      "Contra angle with Japanese ceramic bearings",
      "Straight handpiece with anti-slip body design",
      "Air motor with super torque, max torque >65N, and max speed >20,000 RPM",
      "Shorter air motor listed as more efficient and lower noise",
    ],
    specifications: [
      ["Model", "Gold L"],
      ["Torque", ">65N"],
      ["Air pressure", "0.2-0.3 Mpa"],
      ["Spray", "External water spray"],
      ["Maximum rotation speed", "20,000 RPM"],
      ["Bearings", "NSK ceramic bearings"],
      ["Noise", "<65 dB"],
      ["Body material", "Copper"],
      ["Chucking type", "Key type"],
      ["Disinfection", "Autoclavable not more than 135 C"],
    ],
    relatedProducts: ["gold-ln", "a-ring", "a-pro"],
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
