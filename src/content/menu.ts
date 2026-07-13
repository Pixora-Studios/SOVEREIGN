export type MenuItem = {
  id: string;
  name: string;
  description: string;   // one authentic evocative line, not generic
  price: number;
  category: "cocktails" | "spirits" | "small-plates" | "mains" | "desserts" | "non-alcoholic";
  dietary: "veg" | "non-veg" | "vegan";
  image: string;
  signature?: boolean;    // flags "SOVEREIGN Signature" items for home teaser
};

export const menuItems: MenuItem[] = [
  // COCKTAILS
  {
    id: "obsidian-sour",
    name: "Obsidian Sour",
    description: "Cold-infused charcoal bourbon, fresh key lime, smoked rosemary syrup, egg white.",
    price: 850,
    category: "cocktails",
    dietary: "non-veg", // contains egg white
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    signature: true,
  },
  {
    id: "patia-gilt",
    name: "Patia Gilt",
    description: "Clarified punch of premium gin, Odisha wild honey, lime-leaf essence, and edible 24k gold leaf.",
    price: 950,
    category: "cocktails",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    signature: true,
  },
  {
    id: "nocturnal-elixir",
    name: "Nocturnal Elixir",
    description: "Single estate mezcal, amaro montenegro, cold-brewed espresso, dark chocolate mist.",
    price: 900,
    category: "cocktails",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600",
    signature: true,
  },
  {
    id: "void-negroni",
    name: "Void Negroni",
    description: "Fat-washed coconut rum, campari, sweet vermouth infused with local roasted robusta beans.",
    price: 800,
    category: "cocktails",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600",
    signature: false,
  },
  {
    id: "sovereign-spritz",
    name: "Sovereign Spritz",
    description: "Elderflower liqueur, dry prosecco, fresh cucumber juice, carbonated wild basil mineral water.",
    price: 750,
    category: "cocktails",
    dietary: "veg",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    signature: true,
  },

  // SPIRITS
  {
    id: "macallan-12",
    name: "The Macallan 12 YO Sherry Oak",
    description: "Classic Speyside single malt, notes of sweet dried fruits, spice, and oak smoke.",
    price: 1200,
    category: "spirits",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "clase-azul",
    name: "Clase Azul Reposado",
    description: "Ultra-premium reposado tequila made from 100% blue agave, smooth, complex, and sweet.",
    price: 1800,
    category: "spirits",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "belvedere-luminous",
    name: "Belvedere Luminous",
    description: "Quadruple-distilled rye vodka, exceptionally smooth, served with cold, raw oyster-leaf shells.",
    price: 900,
    category: "spirits",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=600",
  },

  // SMALL PLATES
  {
    id: "truffle-wild-mushroom",
    name: "Truffle & Wild Mushroom Crostini",
    description: "Pan-roasted local oyster and porcini mushrooms, black truffle paste on sourdough.",
    price: 550,
    category: "small-plates",
    dietary: "veg",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "crispy-calamari",
    name: "Crispy Calamari with Ink Aioli",
    description: "Lightly dusted squid rings, charcoal garlic aioli, charred lemon squeeze.",
    price: 650,
    category: "small-plates",
    dietary: "non-veg",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "beetroot-tartare",
    name: "Coal-Roasted Beetroot Tartare",
    description: "Smoked beetroot, capers, mustard seed emulsion, crispy flaxseed wafers.",
    price: 480,
    category: "small-plates",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
  },

  // MAINS
  {
    id: "glazed-pork-belly",
    name: "Sticky Soy Glazed Pork Belly",
    description: "Slow-rendered pork belly, local wild ginger glaze, hand-cut green scallion curls.",
    price: 850,
    category: "mains",
    dietary: "non-veg",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "charred-paneer-steak",
    name: "Charred Paneer Steak in Green Jus",
    description: "House-crafted cottage cheese steak, woodfire smoky mint and coriander broth, crispy parsnips.",
    price: 680,
    category: "mains",
    dietary: "veg",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "hand-cut-tagliatelle",
    name: "Hand-Cut Tagliatelle with Asparagus",
    description: "Rich, slow-simmered pine nut and sage butter sauce, shaved white asparagus.",
    price: 720,
    category: "mains",
    dietary: "veg",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600",
  },

  // DESSERTS
  {
    id: "dark-chocolate-void",
    name: "The Dark Chocolate Void",
    description: "72% single-origin dark chocolate dome, sea salt caramel core, hot espresso pour-over.",
    price: 480,
    category: "desserts",
    dietary: "veg",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "lemongrass-panna-cotta",
    name: "Lemongrass & Coconut Panna Cotta",
    description: "Silky vegan panna cotta, fresh mango-basil compote, kaffir lime zest dusting.",
    price: 450,
    category: "desserts",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
  },

  // NON-ALCOHOLIC
  {
    id: "smoked-jalapeno-grapefruit",
    name: "Smoked Jalapeño & Grapefruit Fizz",
    description: "Cold-pressed pink grapefruit, house jalapeno reduction, smoked salt rim, wild basil.",
    price: 400,
    category: "non-alcoholic",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "forest-tonic",
    name: "Forest Tonic",
    description: "Local wild ginger, lemon thyme syrup, premium light tonic, chilled rose-water vapor.",
    price: 380,
    category: "non-alcoholic",
    dietary: "vegan",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=600",
  }
];
