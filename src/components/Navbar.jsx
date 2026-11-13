"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../context/theme-context";
import {
  Sun,
  Moon,
  Menu,
  X,
  BookMarked,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import logoImg from "../assets/BookNook Open Book Logo.png";
import UserBlocks from "./UserBlock";
import { useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = user
    ? [
        { href: "/", label: "Home" },
        { href: "/all-books", label: "All Books" },
        { href: "/add-book", label: "Add Book" },
        { href: "/my-books", label: "My Books" },
        { href: "/my-borrows", label: "My Borrows" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/all-books", label: "All Books" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="w-full max-w-[200px] sm:max-w-[220px]">
            <Image
              src={logoImg}
              alt="BookNook Logo"
              width={200}
              height={48}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          <UserBlocks />
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-200 hover:bg-muted"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background/98 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <UserBlocks />
        </div>
      )}
    </header>
  );
}
