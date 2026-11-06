"use client";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  BookOpen,
  BookMarked,
  Calendar,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function MyProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-4xl space-y-10">
      <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />

        <div className="relative pt-12 flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl overflow-hidden border-4 border-card shadow-2xl bg-muted flex-shrink-0">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="user image"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 space-y-1.5 pb-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              {user?.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-primary" />
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground font-heading">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/my-borrows"
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-muted/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <BookMarked className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                View My Borrows
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </Link>

          <Link
            href="/my-books"
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-muted/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                View My Books
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </Link>

          <Link
            href="/add-book"
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-muted/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Add New Book
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
