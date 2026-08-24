export const studyThemes = {
  default: {
    heroOverlay: "rgba(0, 100, 0, 0.75)",
    accent: "#006400",
    quoteBorder: "#006400",
    sectionTitle: "#006400",
    footer: "#006400",
    footerText: "#ffffff",
  },

  family: {
    heroOverlay: "rgba(80, 40, 20, 0.75)",
    accent: "#8B4513",
    quoteBorder: "#8B4513",
    sectionTitle: "#8B4513",
    footer: "#8B4513",
    footerText: "#ffffff",
  },

  bible: {
    heroOverlay: "rgba(30, 80, 120, 0.75)",
    accent: "#1e5078",
    quoteBorder: "#1e5078",
    sectionTitle: "#1e5078",
    footer: "#1e5078",
    footerText: "#ffffff",
  },

  health: {
    heroOverlay: "rgba(20, 120, 70, 0.75)",
    accent: "#147846",
    quoteBorder: "#147846",
    sectionTitle: "#147846",
    footer: "#147846",
    footerText: "#ffffff",
  },
} as const;

export type StudyThemeName = keyof typeof studyThemes;