import { v4 as uuidv4 } from "uuid";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to check if a discount is currently active
export const isDiscountActive = (discount) => {
  if (!discount || !discount.active) return false;

  const now = new Date();

  // Check start date if provided
  if (discount.startDate && new Date(discount.startDate) > now) {
    return false;
  }

  // Check end date if provided
  if (discount.endDate && new Date(discount.endDate) < now) {
    return false;
  }

  return true;
};

export const CATEGORIES = [
  "Writing",
  "Coding",
  "Data",
  "Marketing",
  "Productivity",
  "Design",
  "Business",
  "Education",
];

// Initial seed data
const initialSkills = [
  {
    id: "b5a29c1f-47d0-482a-9e2f-5188f6b4e130",
    title: "Expert React Components Generator",
    tagline: "Generate clean, typed React components instantly",
    description:
      "A highly tuned prompt that generates accessible, Tailwind-styled React components with best practices. Perfect for rapid prototyping or building out design systems without the boilerplate.",
    content:
      "You are an expert frontend engineer. Generate a React component for [INPUT]. Use functional components, hooks, and Tailwind CSS. Ensure it is accessible (a11y) and responsive.",
    category: "Coding",
    price: 15,
    discount: {
      active: true,
      type: "percentage",
      value: 20,
      label: "Launch Offer",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.9,
    image: "/skills/coding.jpg",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "a89f30b2-11c5-43ea-98a0-2f17b3d91c5e",
    title: "SEO Blog Post Outliner Pro",
    tagline: "Rank higher with perfectly structured content outlines",
    description:
      "Generates comprehensive blog post outlines optimized for search intent and NLP keywords. Helps writers skip the blank page and focus on writing high-ranking content.",
    content:
      "Act as an SEO expert. Create a comprehensive blog post outline for the topic: [TOPIC]. Include H1, H2s, H3s, suggested word counts, and LSI keywords to target. Focus on search intent.",
    category: "Marketing",
    price: 10,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.7,
    image: "/skills/marketing.jpg",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: "f9c8d3e2-88f1-46bb-89c0-11234bcf891a",
    title: "Cold Email Outreach Architect",
    tagline: "Write B2B sales emails that actually get replies",
    description:
      "A specialized workflow for generating personalized, high-converting B2B cold emails. Includes frameworks for personalization, value proposition, and low-friction calls to action.",
    content:
      "Act as an elite B2B copywriter. Write a 4-step cold email sequence for [PRODUCT/SERVICE] targeting [AUDIENCE]. Keep emails under 100 words. Focus on their pain point: [PAIN POINT]. End with a soft CTA.",
    category: "Writing",
    price: 25,
    discount: { active: true, type: "flat", value: 5, label: "Flash Sale" },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.8,
    image: "/skills/writing.jpg",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "d1e2f3a4-b5c6-78d9-e0f1-a2b3c4d5e6f7",
    title: "SQL Query Optimizer & Explainer",
    tagline: "Fix slow queries and understand complex joins easily",
    description:
      "Paste in any slow or confusing SQL query, and this skill will explain what it does, identify performance bottlenecks, and rewrite it using best practices (CTEs, proper indexing suggestions).",
    content:
      "You are a Senior Database Administrator. Analyze the following SQL query: [QUERY]. 1. Explain what it does simply. 2. Identify performance risks. 3. Rewrite it for maximum performance using CTEs if applicable.",
    category: "Data",
    price: 12,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 5.0,
    image: "/skills/data.jpg",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "c5b6a7d8-e9f0-1a2b-3c4d-5e6f7a8b9c0d",
    title: "Weekly Review & Priority Matrix",
    tagline: "Turn your brain dump into an actionable weekly plan",
    description:
      "Input your messy notes, tasks, and worries from the week. This workflow categorizes them using the Eisenhower Matrix and builds a focused plan for your upcoming week.",
    content:
      "Act as an executive productivity coach. Review this brain dump: [NOTES]. Organize items into the Eisenhower Matrix (Urgent/Important). Then, suggest the top 3 critical priorities I must accomplish next week.",
    category: "Productivity",
    price: 8,
    discount: {
      active: true,
      type: "percentage",
      value: 50,
      label: "Half Price",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.6,
    image: "/skills/review.jpg",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: "e4d3c2b1-a0f9-8e7d-6c5b-4a3b2c1d0e9f",
    title: "Midjourney Prompt Architect",
    tagline: "Generate photorealistic and stylized image prompts",
    description:
      "Stop guessing what parameters to use. This skill takes your basic idea and expands it into highly detailed Midjourney prompts including lighting, camera angles, and rendering styles.",
    content:
      "Act as an expert AI prompt engineer for Midjourney v6. I want an image of: [SUBJECT]. Generate 3 highly detailed prompts. Include camera type, lighting (e.g., cinematic, volumetric), medium, and aspect ratio parameters.",
    category: "Design",
    price: 18,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.9,
    image: "/skills/design.png",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: "b7a8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d",
    title: "Startup Pitch Deck Reviewer",
    tagline: "Get VC-level feedback on your pitch deck narrative",
    description:
      "Simulates a venture capitalist reviewing your slide deck structure. It points out missing metrics, weak value propositions, and helps tighten the narrative arc before you pitch.",
    content:
      "Act as a top-tier Venture Capitalist. Review my pitch deck narrative outline: [OUTLINE]. Critique the problem statement, solution clarity, market sizing, and traction. Be direct and point out red flags a VC would see.",
    category: "Business",
    price: 35,
    discount: {
      active: true,
      type: "flat",
      value: 10,
      label: "Founder Special",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.4,
    image: "/skills/business.jpg",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: "f1e2d3c4-b5a6-9876-1234-56789abcdef0",
    title: "Socratic Mental Model Tutor",
    tagline: "Learn complex concepts through guided questioning",
    description:
      "Instead of just giving you the answer, this skill acts as a Socratic tutor. It teaches you mental models (like First Principles or Inversion) by asking you thought-provoking questions.",
    content:
      "Act as a master Socratic tutor. I want to learn about: [TOPIC/MENTAL MODEL]. Do not just explain it. Start by asking me a fundamental question to test my current understanding, and guide me to the answer step-by-step.",
    category: "Education",
    price: 10,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.8,
    image: "/skills/education.jpg",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "aa11bb22-cc33-dd44-ee55-ff6677889900",
    title: "Python Script Debugger & Explainer",
    tagline: "Debug, explain, and refactor Python code instantly",
    description:
      "Paste any broken or confusing Python script. This skill identifies bugs, explains every block in plain English, and rewrites it following PEP 8 standards with type hints.",
    content:
      "You are a senior Python developer. Analyze this code: [CODE]. 1. Find and fix all bugs. 2. Explain each section in simple English. 3. Refactor using PEP 8, type hints, and docstrings.",
    category: "Coding",
    price: 20,
    discount: {
      active: true,
      type: "percentage",
      value: 15,
      label: "Dev Week",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.7,
    image: "/skills/coding.jpg",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "bb22cc33-dd44-ee55-ff66-778899001122",
    title: "LinkedIn Profile Optimizer",
    tagline: "Transform your LinkedIn into a recruiter magnet",
    description:
      "Rewrites your About section, headline, and experience bullets using proven LinkedIn SEO keywords and storytelling techniques to increase profile views and inbound opportunities.",
    content:
      "Act as a LinkedIn career coach. Rewrite my LinkedIn profile. Current headline: [HEADLINE]. About: [ABOUT]. I am targeting: [TARGET ROLE]. Optimize for discoverability and make it compelling to recruiters.",
    category: "Marketing",
    price: 14,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.5,
    image: "/skills/marketing.jpg",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: "cc33dd44-ee55-ff66-7788-990011223344",
    title: "Product Requirements Doc Writer",
    tagline: "Turn feature ideas into engineering-ready PRDs",
    description:
      "Converts a rough product idea into a structured Product Requirements Document with user stories, acceptance criteria, edge cases, and technical considerations ready for your engineering team.",
    content:
      "Act as a senior Product Manager at a top tech company. Write a full PRD for this feature: [FEATURE IDEA]. Include: Problem statement, goals, user stories, acceptance criteria, non-goals, and open questions.",
    category: "Business",
    price: 30,
    discount: {
      active: true,
      type: "percentage",
      value: 10,
      label: "PM Promo",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.6,
    image: "/skills/business.jpg",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: "dd44ee55-ff66-7788-9900-112233445566",
    title: "Data Visualization Recommender",
    tagline: "Pick the right chart type for any dataset, every time",
    description:
      "Describe your dataset and story you want to tell. This skill recommends the optimal chart type with rationale, color palette, and Python/Matplotlib code to generate it.",
    content:
      "Act as a data visualization expert. I have this dataset: [DESCRIPTION]. I want to show: [INSIGHT]. Recommend the best chart type with justification, suggest a color palette, and write Matplotlib code to generate it.",
    category: "Data",
    price: 16,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.3,
    image: "/skills/data.jpg",
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
  },
  {
    id: "ee55ff66-7788-9900-1122-334455667788",
    title: "Meeting Summarizer & Action Extractor",
    tagline: "Turn messy meeting notes into crisp summaries",
    description:
      "Paste raw meeting notes or transcript. This skill produces a clean executive summary, a categorized list of action items with owners, and follow-up questions to resolve ambiguity.",
    content:
      "Act as a Chief of Staff. Summarize these meeting notes: [NOTES]. Output: 1. 3-sentence executive summary. 2. Action items table (task | owner | deadline). 3. Open questions still unresolved.",
    category: "Productivity",
    price: 9,
    discount: { active: true, type: "flat", value: 2, label: "Intro Price" },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.2,
    image: "/skills/meeting.jpg",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "ff66aa77-8899-0011-2233-445566778899",
    title: "Brand Identity Naming Generator",
    tagline: "Find the perfect name for your brand or product",
    description:
      "Input your business category, target audience, and brand values. This skill generates 20 unique name ideas with rationale, domain availability hints, and trademark risk assessment.",
    content:
      "Act as a brand strategist at a top naming agency. My business: [DESCRIPTION]. Target audience: [AUDIENCE]. Brand values: [VALUES]. Generate 20 unique brand name ideas. For each, give a 1-line rationale and trademark risk score (Low/Med/High).",
    category: "Design",
    price: 22,
    discount: { active: false },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.6,
    image: "/skills/design.png",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "ab12cd34-ef56-7890-abcd-ef1234567890",
    title: "Interview Answer Coach",
    tagline: "Nail behavioral interviews with the STAR method",
    description:
      "Provide a job description and a behavioral question. This skill crafts a polished STAR-method answer tailored to the role, then gives coaching notes on delivery and timing.",
    content:
      "Act as an executive interview coach. Job description: [JD]. Question: [QUESTION]. Write a compelling STAR answer (Situation, Task, Action, Result) for this candidate profile: [BACKGROUND]. Add delivery tips and time the response.",
    category: "Education",
    price: 12,
    discount: {
      active: true,
      type: "percentage",
      value: 25,
      label: "Career Boost",
    },
    sellerId: "seller-1",
    sellerName: "Alice Seller",
    rating: 4.9,
    image: "/skills/education.jpg",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
];

const initialUsers = [
  {
    id: "seller-1",
    name: "Alice Seller",
    email: "alice@test.com",
    passwordHash: "password123",
    role: "seller",
  },
  {
    id: "buyer-1",
    name: "Bob Buyer",
    email: "bob@test.com",
    passwordHash: "password123",
    role: "buyer",
  },
];

// Versioned seed — bump SEED_VERSION to force re-seed when data changes
const SEED_VERSION = "v8";
if (localStorage.getItem("seedVersion") !== SEED_VERSION) {
  localStorage.setItem("skills", JSON.stringify(initialSkills));
  localStorage.setItem("users", JSON.stringify(initialUsers));
  localStorage.setItem("orders", JSON.stringify([]));
  localStorage.setItem(
    "coupons",
    JSON.stringify([
      {
        id: "coupon-1",
        code: "WELCOME10",
        type: "flat",
        value: 10,
        sellerId: "seller-1",
      },
    ])
  );
  localStorage.setItem("seedVersion", SEED_VERSION);
}

export const mockApi = {
  getCategories: () => CATEGORIES,

  // --- AUTH ---
  login: async (email, password) => {
    await delay(300);
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.email === email && u.passwordHash === password
    );
    if (!user) throw new Error("Invalid email or password");

    // Simulate JWT token
    const token = `mock-jwt-${user.id}`;
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { token, user };
  },

  signup: async (name, email, password, role) => {
    await delay(400);
    const users = JSON.parse(localStorage.getItem("users"));
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser = { id: uuidv4(), name, email, passwordHash: password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const token = `mock-jwt-${newUser.id}`;
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return { token, user: newUser };
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  },

  updateUser: async (userId, updates) => {
    await delay(300);
    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error("User not found");

    const updatedUser = { ...users[index], ...updates };
    users[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user in local storage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    return updatedUser;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  },

  // --- SKILLS ---
  getSkills: async (filters = {}) => {
    await delay(300);
    let skills = JSON.parse(localStorage.getItem("skills"));

    if (filters.category) {
      skills = skills.filter((s) => s.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      skills = skills.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    if (filters.onOfferOnly) {
      skills = skills.filter((s) => isDiscountActive(s.discount));
    }
    if (filters.minPrice !== undefined && filters.minPrice !== "") {
      skills = skills.filter((s) => s.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== "") {
      skills = skills.filter((s) => s.price <= Number(filters.maxPrice));
    }

    // helper: compute effective discounted price
    const getDiscounted = (s) => {
      if (!isDiscountActive(s.discount)) return s.price;
      let discountedPrice;
      if (s.discount.type === "percentage") {
        discountedPrice = s.price - (s.price * s.discount.value) / 100;
      } else {
        discountedPrice = s.price - s.discount.value;
      }
      // Ensure discounted price is always greater than 0
      return Math.max(0.01, discountedPrice);
    };
    // helper: compute discount % for sorting
    const getDiscountPct = (s) => {
      if (!isDiscountActive(s.discount)) return 0;
      return ((s.price - getDiscounted(s)) / s.price) * 100;
    };

    // sorting
    if (filters.sort === "priceAsc") skills.sort((a, b) => a.price - b.price);
    if (filters.sort === "priceDesc") skills.sort((a, b) => b.price - a.price);
    if (filters.sort === "newest")
      skills.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filters.sort === "ratingDesc")
      skills.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "biggestDiscount")
      skills.sort((a, b) => getDiscountPct(b) - getDiscountPct(a));

    // Filter out content for guest/browse view
    return skills.map(({ content, ...rest }) => rest);
  },

  getSkillById: async (id) => {
    await delay(200);
    const skills = JSON.parse(localStorage.getItem("skills"));
    const skill = skills.find((s) => s.id === id);
    if (!skill) throw new Error("Skill not found");

    const { content, ...rest } = skill;
    return rest; // content excluded unless purchased or owned
  },

  getSkillContent: async (id, userId) => {
    await delay(200);
    // Check if user owns it or bought it
    const skills = JSON.parse(localStorage.getItem("skills"));
    const skill = skills.find((s) => s.id === id);
    if (!skill) throw new Error("Skill not found");

    if (skill.sellerId === userId) return skill.content; // Seller owns it

    const orders = JSON.parse(localStorage.getItem("orders"));
    const hasPurchased = orders.some(
      (o) => o.buyerId === userId && o.items.some((i) => i.skillId === id)
    );

    if (!hasPurchased) throw new Error("Unauthorized to view content");
    return skill.content;
  },

  createSkill: async (skillData) => {
    await delay(400);
    const skills = JSON.parse(localStorage.getItem("skills"));
    const newSkill = {
      ...skillData,
      id: uuidv4(),
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    skills.push(newSkill);
    localStorage.setItem("skills", JSON.stringify(skills));
    return newSkill;
  },

  updateSkill: async (id, skillData, userId) => {
    await delay(400);
    const skills = JSON.parse(localStorage.getItem("skills"));
    const index = skills.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Not found");
    if (skills[index].sellerId !== userId) throw new Error("Unauthorized");

    skills[index] = { ...skills[index], ...skillData };
    localStorage.setItem("skills", JSON.stringify(skills));
    return skills[index];
  },

  deleteSkill: async (id, userId) => {
    await delay(300);
    let skills = JSON.parse(localStorage.getItem("skills"));
    const skill = skills.find((s) => s.id === id);
    if (!skill) throw new Error("Not found");
    if (skill.sellerId !== userId) throw new Error("Unauthorized");

    skills = skills.filter((s) => s.id !== id);
    localStorage.setItem("skills", JSON.stringify(skills));
    return true;
  },

  // --- ORDERS ---
  createOrder: async (orderData) => {
    await delay(500);
    const orders = JSON.parse(localStorage.getItem("orders"));
    const newOrder = {
      ...orderData,
      id: uuidv4(),
      status: "completed",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  },

  getMyOrders: async (userId) => {
    await delay(300);
    const orders = JSON.parse(localStorage.getItem("orders"));
    return orders
      .filter((o) => o.buyerId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // --- SELLER SUMMARY ---
  getSellerSummary: async (sellerId) => {
    await delay(300);
    const skills = JSON.parse(localStorage.getItem("skills")).filter(
      (s) => s.sellerId === sellerId
    );
    const orders = JSON.parse(localStorage.getItem("orders"));

    let salesCount = 0;
    let revenue = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (skills.some((s) => s.id === item.skillId)) {
          salesCount++;
          revenue += item.pricePaid; // Note: In real app, coupon splits might apply
        }
      });
    });

    return {
      totalListings: skills.length,
      salesCount,
      revenue,
      skills,
    };
  },

  // --- COUPONS ---
  getCoupons: async (sellerId) => {
    await delay(200);
    const coupons = JSON.parse(localStorage.getItem("coupons"));
    return coupons.filter((c) => c.sellerId === sellerId);
  },

  createCoupon: async (couponData) => {
    await delay(300);
    const coupons = JSON.parse(localStorage.getItem("coupons"));
    const newCoupon = { ...couponData, id: uuidv4() };
    coupons.push(newCoupon);
    localStorage.setItem("coupons", JSON.stringify(coupons));
    return newCoupon;
  },

  deleteCoupon: async (id, sellerId) => {
    await delay(300);
    let coupons = JSON.parse(localStorage.getItem("coupons"));
    coupons = coupons.filter((c) => c.id !== id || c.sellerId !== sellerId);
    localStorage.setItem("coupons", JSON.stringify(coupons));
    return true;
  },

  validateCoupon: async (code) => {
    await delay(300);
    const coupons = JSON.parse(localStorage.getItem("coupons"));
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );
    if (!coupon) throw new Error("Invalid or expired coupon");
    return coupon;
  },
};
