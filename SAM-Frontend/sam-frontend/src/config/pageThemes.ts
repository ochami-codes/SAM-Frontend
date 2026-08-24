export const pageThemes = {
  default: {
    heroOverlay: "rgba(0, 100, 0, 0.75)",
    accent: "#006400",
    sectionTitle: "#006400",
    footer: "#006400",
    footerText: "#ffffff",
  },

  bible: {
    heroOverlay: "rgba(46, 139, 87, 0.75)",
    accent: "#2e8b57",
    sectionTitle: "#2e8b57",
    footer: "#2e8b57",
    footerText: "#ffffff",
  },

  health: {
    heroOverlay: "rgba(20, 120, 70, 0.75)",
    accent: "#147846",
    sectionTitle: "#147846",
    footer: "#147846",
    footerText: "#ffffff",
  },

  family: {
    heroOverlay: "rgba(80, 40, 20, 0.75)",
    accent: "#8b4513",
    sectionTitle: "#8b4513",
    footer: "#8b4513",
    footerText: "#ffffff",
  },

  finances: {
    heroOverlay: "rgba(30, 90, 70, 0.75)",
    accent: "#1e5a46",
    sectionTitle: "#1e5a46",
    footer: "#1e5a46",
    footerText: "#ffffff",
  },
} as const;

export type PageThemeName = keyof typeof pageThemes;