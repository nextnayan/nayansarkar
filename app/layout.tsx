import JsonLd from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nayan Sarkar | Full Stack Developer",
    template: "%s | Nayan Sarkar",
  },
  description: "Portfolio of Nayan Sarkar, a Full Stack Web Developer specializing in Python, Django, React, and Next.js.",
  keywords: ["Nayan Sarkar", "Full Stack Developer", "Web Developer", "React", "Next.js", "Django", "Python"],
  authors: [{ name: "Nayan Sarkar" }],
  creator: "Nayan Sarkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nayanbd.com",
    title: "Nayan Sarkar | Full Stack Developer",
    description: "Portfolio of Nayan Sarkar, a Full Stack Web Developer specializing in Python, Django, React, and Next.js.",
    siteName: "Nayan Sarkar Portfolio",
    images: [
      {
        url: "/nayan_sarkar.png",
        width: 800,
        height: 600,
        alt: "Nayan Sarkar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayan Sarkar | Full Stack Developer",
    description: "Portfolio of Nayan Sarkar, a Full Stack Web Developer specializing in Python, Django, React, and Next.js.",
    images: ["/nayan_sarkar.png"],
    creator: "@nayansarkar", // Replace with actual handle if known
  },
  icons: {
    icon: "/nayan_sarkar.png",
    shortcut: "/nayan_sarkar.png",
    apple: "/nayan_sarkar.png",
  },
  metadataBase: new URL("https://www.nayanbd.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
