import type { Metadata } from "next";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Second Advent Ministries",
  description:
    "Proclaiming the Everlasting Gospel with Truth and Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">

        <div className="flex min-h-screen">
          <Sidebar />

          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
