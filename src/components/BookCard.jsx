import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, User } from "lucide-react";

export default function BookCard({ book }) {
  const categoryColors = {
    Fiction: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    Science: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    History: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
    Kids: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    Others: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20"
  };

  const badgeClass = categoryColors[book.category] || categoryColors.Others;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40">
      <div>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${badgeClass}`}>
              {book.category}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md">
              <BookOpen className="h-3 w-3" />
              {book.copies} {book.copies === 1 ? "copy" : "copies"}
            </span>
          </div>
        </div>

        <div className="pt-4 space-y-1.5">
          <h3 className="font-bold text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="line-clamp-1">by {book.author}</span>
          </div>
          {book.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 pt-1 leading-relaxed">
              {book.description}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-border/60">
        <Link
          href={`/book-details?id=${book.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-muted/80 text-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
