import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Atom,
  Landmark,
  CheckCircle2,
  Search,
  CornerDownLeft,
  ShieldCheck,
  BookOpenCheck,
  Undo2,
} from "lucide-react";
import BookCard from "@/components/BookCard";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
  const books = await response.json();

  const categoriesList = books.map((cat) => cat.category);

  const uniqueCategories = [...new Set(categoriesList)];

  const newArrivals = books.reverse().slice(0, 8);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-6 w-6" />;
      case "Atom":
        return <Atom className="h-6 w-6" />;
      case "Landmark":
        return <Landmark className="h-6 w-6" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return <Search className="h-6 w-6 text-primary" />;
      case 1:
        return <BookOpen className="h-6 w-6 text-amber-500" />;
      case 2:
        return <CornerDownLeft className="h-6 w-6 text-emerald-500" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-20 pb-20">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <HeroSlider />
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Fresh On The Shelves</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              New Arrivals
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Check out the latest additions contributed by readers and curated
              by our library community.
            </p>
          </div>

          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            <span>See all books</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold shadow-sm hover:bg-muted hover:border-primary/50 transition-all duration-200"
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Explore All Books</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2">
            <span>Explore Genres</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            Most Popular Categories
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Dive into captivating stories and deep insights arranged by the
            genres our community loves most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {uniqueCategories.map((category, ind) => (
            <Link
              key={ind}
              href="/"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center border bg-gradient-to-br ${category.gradient}`}
                >
                  {getCategoryIcon(category.icon)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-card via-card to-muted/40 p-8 sm:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Fast & Simple</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              How to Borrow a Book
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Start borrowing and reading your favorite titles in three easy
              steps with our community library.
            </p>
          </div>

          <section className="bg-muted/40 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
                  How Borrowing Works
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Three steps. No library card needed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-border bg-card px-8 py-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-primary/40">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-[#D9784A] mb-1">
                    Step 1
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    Find a book
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Browse the shelf and open any book you like.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card px-8 py-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-primary/40">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <BookOpenCheck className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-[#D9784A] mb-1">
                    Step 2
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    Borrow it
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Confirm the borrow. The book is yours for 7 days.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card px-8 py-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-primary/40">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <Undo2 className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-[#D9784A] mb-1">
                    Step 3
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    Return it
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Done reading? Return it from My Borrows in one click.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link
              href="/all-books"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-95 hover:scale-[1.01] transition-all duration-200"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
