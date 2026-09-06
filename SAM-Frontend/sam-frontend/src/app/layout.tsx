import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import  QueryProvider from "@/src/components/providers/QueryProvider";
import  ToastProvider  from "@/src/components/providers/ToastProvider";
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
