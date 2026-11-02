import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import QueryProvider from "@/src/components/providers/QueryProvider";
import ToastProvider from "@/src/components/providers/ToastProvider";
import { seo } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://second-advent-ministries.co.ke"),
  title: {
    default: seo.home.title,
    template: "%s | Second Advent Ministries",
  },
  description: seo.home.description,
  keywords: ["Second Advent Ministries", "SAM online ministry", "online bible study", "Bible prophecy", "Second Coming of Jesus", "Adventist online evangelism"],
  authors: [{ name: "Second Advent Ministries" }],
  creator: "Second Advent Ministries",
  
  // FAVICON SETUP
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: "https://second-advent-ministries.co.ke",
    title: seo.home.title,
    description: seo.home.description,
    siteName: "Second Advent Ministries",
    images: [
      {
        url: "/og-image.png", // create a 1200x630 image for sharing
        width: 1200,
        height: 630,
        alt: "Second Advent Ministries",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "ADD_YOURS_LATER_FROM_SEARCH_CONSOLE",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sam-background text-sam-text">
        <AuthProvider>
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}