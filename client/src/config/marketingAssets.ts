/**
 * Marketing Assets Configuration
 * Single source of truth for all marketing site asset paths.
 *
 * APPROVED HERO IMAGES (only these may be used for hero/slider):
 *   /images/hero/image1.jpg – image5.jpg  → rotating slider
 *   /images/hero/image6.jpg               → fallback/default
 *
 * No other hero or gallery images are permitted.
 */

// ========================================
// Approved hero images — ONLY source of truth
// ========================================
export const heroImages = {
  image1: "/images/hero/image1.jpg",
  image2: "/images/hero/image2.jpg",
  image3: "/images/hero/image3.jpg",
  image4: "/images/hero/image4.jpg",
  image5: "/images/hero/image5.jpg",
  /** Fallback / default image */
  image6: "/images/hero/image6.jpg",
} as const;

/**
 * Marketing Assets Object
 * Import this object in any component that needs marketing assets.
 */
export const marketingAssets = {
  // ========================================
  // Brand Assets
  // ========================================
  brand: {
    logoFull: "/assets/marketing/brand/logo-full.svg",
    logoIcon: "/assets/marketing/brand/logo-icon.svg",
  },

  // ========================================
  // Hero Section — use heroImages above
  // ========================================
  hero: heroImages,

  // ========================================
  // Contact Page
  // ========================================
  contact: {
    hero: "/assets/marketing/contact/contact-hero.svg",
  },

  // ========================================
  // Auth Pages (Login/Register)
  // ========================================
  auth: {
    background: "/assets/marketing/auth/auth-bg.svg",
  },

  // ========================================
  // Dashboard
  // ========================================
  dashboard: {
    preview: "/assets/marketing/dashboard/dashboard-preview.svg",
  },
} as const;

/** Slides for the landing page hero image slider (image1–image5 only) */
export const heroSlides = [
  {
    image: heroImages.image1,
    title: "Professional Horse Management",
    subtitle:
      "Everything you need to keep your horses healthy and performing their best.",
  },
  {
    image: heroImages.image2,
    title: "Your Stable, Organised",
    subtitle:
      "Health records, training logs, nutrition plans — all in one place.",
  },
  {
    image: heroImages.image3,
    title: "Training & Progress Tracking",
    subtitle: "Monitor every session, track trends, and celebrate progress.",
  },
  {
    image: heroImages.image4,
    title: "Smarter Decisions, Happier Horses",
    subtitle:
      "AI-powered weather analysis and real-time riding recommendations.",
  },
  {
    image: heroImages.image5,
    title: "Built for Professionals",
    subtitle:
      "From single-horse owners to multi-horse stables — scale as you grow.",
  },
];

/** Slides for the auth (login/register) image slider */
export const authSlides = [
  {
    image: heroImages.image1,
    title: "Track every detail of your horse's health",
  },
  {
    image: heroImages.image2,
    title: "Organised training logs and analytics",
  },
  {
    image: heroImages.image3,
    title: "Beautiful interface, powerful features",
  },
  {
    image: heroImages.image4,
    title: "Manage your stable with confidence",
  },
  {
    image: heroImages.image5,
    title: "Join thousands of equestrians",
  },
];

/**
 * Asset inventory for documentation
 */
export const assetInventory = {
  totalImages: 6,
  totalVideos: 0,
  breakdown: {
    hero: 6,
  },
};
