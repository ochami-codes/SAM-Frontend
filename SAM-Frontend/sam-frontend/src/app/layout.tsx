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
  openGraph: {
    type: "website",
    url: "https://second-advent-ministries.co.ke",
    title: seo.home.title,
    description: seo.home.description,
    siteName: "Second Advent Ministries",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Important: tells Google you are online-only
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
