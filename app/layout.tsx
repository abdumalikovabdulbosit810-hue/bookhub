import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kitob Market - Online Bookstore Marketplace",
    template: "%s | Kitob Market"
  },
  description: "Premium online bookstore marketplace for business, programming, IELTS, novels, psychology, finance, and technology books.",
  keywords: ["Kitob Market", "books", "bookstore", "Uzbekistan", "IELTS", "programming books"],
  openGraph: {
    title: "Kitob Market",
    description: "A premium marketplace focused entirely on books.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
