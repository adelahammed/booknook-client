"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BookOpen,
  User,
  Mail,
  Tag,
  Layers,
  X,
  Sparkles,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

function BookDetailsContent({ book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const handleConfirmBorrow = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            bookBorrowed: book._id,
          }),
        },
      );
      const data = await result.json();

      if (result.ok && (data.acknowledged || data.insertedId || data.success)) {
        toast.success("Book successfully added to BookNook!");
        // Optional: Reset form here if desired
      } else {
        toast.error(data.message || "Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  // const handleConfirmBorrow = (e) => {
  //   e.preventDefault();

  //   if (book.copies > 0) {
  //     setIsModalOpen(false);
  //     setBorrowerName("");
  //     setBorrowerEmail("");

  //     toast.success(
  //       `You have successfully borrowed "${book.title}"! Enjoy your read.`,
  //     );
  //   } else {
  //     toast.error("Sorry, no copies are left for this book.");
  //   }
  // };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-5xl space-y-8">
      <div>
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Books</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-2xl shadow-2xl bg-muted border border-border">
              <Image
                src={book.image}
                alt={book.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>

            <div className="w-full max-w-[340px] mt-6 p-4 rounded-xl border border-border bg-muted/40 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-primary" />
                  <span>Copies Left</span>
                </span>

                <span
                  className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                    book.copies > 0
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {book.copies > 0
                    ? `${book.copies} available`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-border/70">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Category</span>
                </span>

                <span className="font-semibold text-foreground">
                  {book.category}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Featured Library Book</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
                {book.title}
              </h1>

              <div className="flex items-center gap-2 text-base text-muted-foreground mt-2">
                <User className="h-4 w-4 text-primary" />
                <span>
                  Author:{" "}
                  <strong className="text-foreground">{book.author}</strong>
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                  Added by Member
                </span>
                <p className="font-bold text-foreground">{book.addedBy}</p>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground sm:border-l sm:border-border sm:pl-4">
                <Mail className="h-4 w-4 text-primary" />
                <span>{book.addedEmail}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground font-heading">
                About this Book
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl border border-border bg-muted/30 text-center">
                <span className="text-[11px] text-muted-foreground block">
                  Language
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  English
                </span>
              </div>

              <div className="p-3 rounded-xl border border-border bg-muted/30 text-center">
                <span className="text-[11px] text-muted-foreground block">
                  Format
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  Hardcover & Paper
                </span>
              </div>

              <div className="p-3 rounded-xl border border-border bg-muted/30 text-center col-span-2 sm:col-span-1">
                <span className="text-[11px] text-muted-foreground block">
                  Loan Period
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  21 Days
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button
                type="button"
                disabled={book.copies <= 0}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  book.copies > 0
                    ? "bg-primary text-primary-foreground hover:opacity-95 hover:shadow-xl hover:scale-[1.01]"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>
                  {book.copies > 0
                    ? "Borrow This Book"
                    : "Currently Unavailable"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Borrow Request</span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-foreground font-heading">
                Borrow Confirmation
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground">
                You are requesting to borrow{" "}
                <strong className="text-foreground">
                  &quot;{book.title}&quot;
                </strong>
                . Please provide your information below.
              </p>
            </div>

            {/* <form onSubmit={handleConfirmBorrow} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Name *</span>
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Your Email Address *</span>
                </label>

                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={borrowerEmail}
                  onChange={(e) => setBorrowerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center justify-between">
                  <span>Loan Period:</span>
                  <span className="font-semibold text-foreground">21 Days</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Return Policy:</span>
                  <span className="font-semibold text-foreground">
                    Free community return
                  </span>
                </div>
              </div>

             
            </form> */}
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBorrow}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetailsContent;
