"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import getTokenClient from "@/lib/getTokenClient";

function BookDetailsContent({ book }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [borrowbooks, setborrowBooks] = useState([]);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = async () => {
      const token = await getTokenClient();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${encodeURIComponent(user.email)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setborrowBooks(data);
          } else {
            setborrowBooks([]);
          }
        } else {
          setborrowBooks([]);
        }
      } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
        setborrowBooks([]);
      }
    };

    fetchBooks();
  }, [user?.email]);

  const isBorrowed = Array.isArray(borrowbooks)
    ? borrowbooks.some((borrow) => borrow._id === book._id)
    : false;

  const handleConfirmBorrow = async (id) => {
    const token = await getTokenClient();
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            bookBorrowed: id,
          }),
        },
      );

      const data = await result.json();

      if (
        !result.ok ||
        !(data.acknowledged || data.insertedId || data.success)
      ) {
        toast.error(data.message || "Failed to borrow book!");
        return;
      }

      const updateResult = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            copies: book.copies - 1,
          }),
        },
      );

      if (!updateResult.ok) {
        toast.error("Borrow saved, but book copies update failed!");
        return;
      }

      toast.success("Book successfully borrowed!");

      setIsModalOpen(false);

      router.push("/my-borrows");
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Something went wrong!");
    }
  };
  const handleDoubleBorrow = () => {
    toast.error("You have already borrowed this book");
  };

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

            <div className="pt-4 border-t border-border">
              {isBorrowed ? (
                <button
                  className="w-full py-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:opacity-95 hover:shadow-xl hover:scale-[1.01]"
                  onClick={handleDoubleBorrow}
                >
                  Borrow This Book
                </button>
              ) : (
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
              )}
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
                . You have to return it in 20 days. .
              </p>
              <form className="space-y-6">
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span>User Name *</span>
                      </label>
                      <input
                        type="text"
                        name="userName"
                        required
                        placeholder="Your full name"
                        value={user?.name || ""}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-muted-foreground text-sm cursor-not-allowed transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>User Email *</span>
                      </label>
                      <input
                        type="email"
                        name="userEmail"
                        required
                        placeholder="your.email@example.com"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-muted-foreground text-sm cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleConfirmBorrow(book._id)}
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
