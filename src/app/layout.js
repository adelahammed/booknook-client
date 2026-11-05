import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/theme-context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookNook - Borrow, Read & Share Books",
  description:
    "A community library platform where readers can borrow books and share their favorite collections.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                className:
                  "border border-border bg-card text-card-foreground shadow-lg text-sm rounded-xl",
                duration: 3500,
              }}
            />
            <Navbar />
            <main className="flex-1 transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
