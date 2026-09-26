/**
 * NICE & GOOD - Baithak Premium CTC Tea
 * Strict Data Architecture Configuration (English Edition)
 * All dynamic content, copy, pricing, specifications, and asset paths are centralized here.
 */

export const siteData = {
  brand: {
    name: "NICE & GOOD",
    companyName: "NICE & GOOD FOODS PVT. LTD.",
    productName: "Baithak",
    productSubtitle: "PREMIUM CTC TEA",
    tagline: "Sit back. Sip tea. Give time to loved ones.",
    taglineHindiRom: "Baitho. Chai piyo. Apnon ko time do.",
    brandMotto: "GOOD PRODUCTS · BETTER MOMENTS · HAPPIER PEOPLE",
    netWeight: "500g",
    mrp: 295,
    currency: "₹",
    discountBadge: "New Fresh Packaging",
    originalPrice: 350,
    fssaiLicense: "FSSAI Lic. No. 13323999000125",
    customerCare: "care@niceandgood.in",
    helpline: "+91 98765 43210",
    website: "www.niceandgood.in",
    address: "NICE & GOOD FOODS PVT. LTD., Gurugram, Haryana - 122001, India",
    origin: "Upper Brahmaputra Valley, Assam, India",
    grade: "Premium Royal CTC Granules (100% Pure Assam Blend)",
    batchNo: "NG-BTH-0501",
    packedOn: "AUG 2025",
    useBy: "JUL 2027",
  },

  orderSettings: {
    notificationPhone: "8305915970",
    notificationPhoneDisplay: "+91 83059 15970",
    notificationWhatsapp: "918305915970",
    estimatedDelivery: "Within 7 Days",
    shippingCharge: "FREE",
    currency: "₹",
  },

  assets: {
    brandLogo: "/assets/brand_logo.webp",
    baithakCrest: "/assets/baithak_crest.webp",
    productPouchFront: "/assets/baithak_pouch_front.webp",
    productPouchBack: "/assets/baithak_pouch_back.webp",
    heroBackground: "/assets/assam_tea_garden.webp",
    steamingChaiCup: "/assets/steaming_chai_cup.webp",
  },

  navigation: [
    { label: "The Story", href: "#hero" },
    { label: "3D Pouch", href: "#product-reveal" },
    { label: "Why Baithak", href: "#features" },
    { label: "Brewing Ritual", href: "#brewing" },
    { label: "Philosophy", href: "#philosophy" },
  ],

  hero: {
    badge: "100% Pure Assam Blend · Single Garden Origin",
    brandTitle: "NICE & GOOD",
    mainHeading: "Baithak",
    subHeading: "PREMIUM CTC TEA",
    tagline: "Sit back. Sip tea. Give time to loved ones.",
    hindiTagline: "बैठो. चाय पियो. अपनों को टाइम दो.",
    englishSubtext:
      "Where the kettle boils, conversations begin, laughter returns, and bonds grow deeper. NICE & GOOD Baithak is an ode to the timeless Indian ritual of sharing heartfelt moments over a rich, golden cup.",
    ctaPrimary: "Order 500g Pack · ₹295",
    ctaSecondary: "Explore 3D Pouch",
    scrollHint: "Scroll to unveil the 3D packaging",
  },

  productReveal: {
    badge: "Interactive 3D Experience",
    sectionTitle: "Volumetric 3D Tea Packaging",
    subtitle: "Filled with 500g of dense, aromatic CTC tea granules. Swipe or drag to rotate 360° and inspect every detail.",
    dragHint: "👆 Swipe or Drag to Rotate 360° · Tap to Flip Front & Back",
    floatingBadges: [
      {
        id: "veg",
        title: "100% Vegetarian",
        desc: "Certified green dot pure vegetarian formulation with zero artificial flavor enhancers.",
        icon: "Leaf",
      },
      {
        id: "freshness",
        title: "Long Lasting Freshness",
        desc: "Triple-layer metallic zip-seal protection preserves garden crispness and vital antioxidants.",
        icon: "ShieldCheck",
      },
      {
        id: "aroma",
        title: "Rich Signature Aroma",
        desc: "Deep malty bouquet and full-bodied briskness that fills the room upon the very first boil.",
        icon: "Sparkles",
      },
    ],
  },

  features: [
    {
      id: "leaf",
      title: "Handpicked Assam Leaves",
      tag: "100% Origin Assured",
      description:
        "Harvested exclusively during the peak second flush from prime Assam estates for signature briskness and rich amber liqueur.",
      highlight: "Second-Flush Harvest",
    },
    {
      id: "taste",
      title: "Pure & Natural Taste",
      tag: "Zero Additives",
      description:
        "100% pure CTC tea granules without synthetic colorants, artificial essences, or preservatives. Authentic traditional kadak chai.",
      highlight: "100% Pure & Unblended",
    },
    {
      id: "aroma",
      title: "Strong Malty Aroma",
      tag: "Sensory Excellence",
      description:
        "An irresistible fragrance that releases instantly as water bubbles, creating an atmosphere of cozy warmth.",
      highlight: "Captivating Fragrance",
    },
    {
      id: "freshness",
      title: "Freshness in Every Sip",
      tag: "Nitrogen Sealed",
      description:
        "Sealed right at the tea estate to lock in essential natural oils, polyphenols, and brisk tea liquor until the final cup.",
      highlight: "Guaranteed Garden Fresh",
    },
  ],

  brewingSteps: [
    {
      step: 1,
      stepNumber: "01",
      title: "Boil Fresh Water",
      detail: "Pour 100ml of fresh filtered water into a saucepan and bring it to a rolling boil.",
      temperature: "100°C Rolling Boil",
      proTip: "Always use fresh cold water for optimal dissolved oxygen and deeper extraction.",
    },
    {
      step: 2,
      stepNumber: "02",
      title: "Add 1 Spoon Tea (~2.5g)",
      detail: "Add 1 heaped teaspoon of Baithak Premium CTC granules directly into the boiling water.",
      measurement: "2.5g Per Cup",
      proTip: "For an extra strong morning kadak kick, add an additional half spoon.",
    },
    {
      step: 3,
      stepNumber: "03",
      title: "Simmer for 3–4 Minutes",
      detail: "Let the tea granules infuse on medium-low flame for 3 to 4 minutes until a deep golden liquor forms.",
      timer: "3–4 Minutes",
      proTip: "Gentle simmering extracts deep malty notes without releasing excessive bitterness.",
    },
    {
      step: 4,
      stepNumber: "04",
      title: "Add Milk & Sugar to Taste",
      detail: "Add 100ml of warm whole milk and sugar or jaggery. Bring to 2 gentle rises, strain through fine mesh, and serve piping hot.",
      finishing: "Creamy & Golden",
      proTip: "Pouring the chai from height creates a velvety, aromatic micro-foam.",
    },
  ],

  emotionalClimax: {
    preTitle: "The Baithak Philosophy",
    quoteWords: [
      "A",
      "great",
      "cup",
      "of",
      "tea",
      "is",
      "not",
      "just",
      "about",
      "taste,",
      "it",
      "is",
      "the",
      "warmth",
      "of",
      "togetherness.",
    ],
    author: "— NICE & GOOD Baithak",
    subtext:
      "In a fast-paced world, Baithak is an invitation to pause, gather together, and cherish slow, heartfelt conversations with the people who matter most.",
  },

  productSpecs: [
    { label: "Product Name", value: "Baithak Premium CTC Tea" },
    { label: "Brand Owner", value: "NICE & GOOD FOODS PVT. LTD." },
    { label: "Net Weight", value: "500 Grams (Yields ~200 Cups)" },
    { label: "FSSAI License", value: "Lic. No. 13323999000125" },
    { label: "Batch Number", value: "NG-BTH-0501" },
    { label: "Packaging Type", value: "Multi-Barrier Foil Pouch with Zip-Lock" },
    { label: "Packed & Use By", value: "Packed: AUG 2025 | Best Before: JUL 2027" },
    { label: "Maximum Retail Price (MRP)", value: "₹295.00 (Inclusive of all taxes)" },
  ],

  checkoutBar: {
    productTitle: "NICE & GOOD Baithak Tea",
    variant: "500g Fresh Zip Pouch",
    price: 295,
    strikePrice: 350,
    shippingText: "Free Express Delivery Across India",
    buttonText: "Buy Now",
    guaranteeText: "Cash on Delivery Available · Guaranteed Fresh Harvest",
  },

  footer: {
    brandName: "NICE & GOOD",
    companyName: "NICE & GOOD FOODS PVT. LTD.",
    tagline: "GOOD PRODUCTS · BETTER MOMENTS · HAPPIER PEOPLE",
    fssaiText: "FSSAI Lic. No. 13323999000125",
    contactEmail: "care@niceandgood.in",
    contactPhone: "+91 98765 43210",
    website: "www.niceandgood.in",
    address: "Gurugram, Haryana - 122001, India",
    copyright: "© 2026 NICE & GOOD FOODS PVT. LTD. All Rights Reserved.",
    trustBadges: [
      "100% Certified Vegetarian",
      "Selected Upper Assam Leaves",
      "Long-Lasting Freshness Seal",
      "Authentic Kadak Malty Flavour",
    ],
  },
};
