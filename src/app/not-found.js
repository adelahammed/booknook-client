import Link from "next/link";
import { BookX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <div className="relative">
        <div className="h-28 w-28 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
          <BookX className="h-14 w-14" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-xs shadow-md">
          404
        </span>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The literary page or bookshelf you are looking for has been moved, archived, or doesn&apos;t exist.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Browse All Books</span>
        </Link>
      </div>
    </div>
  );
}
