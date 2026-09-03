import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Second Advent Ministries",
  description: "Proclaiming the Everlasting Gospel with Truth and Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sam-background text-sam-text">
        {children}
      </body>
    </html>
  );
}