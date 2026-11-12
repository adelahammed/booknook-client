"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  BookMarked,
  CornerDownLeft,
  Calendar,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import getTokenClient from "@/lib/getTokenClient";

export default function MyBorrowsPage() {
  const [borrowbooks, setborrowBooks] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = async () => {
      const token = await getTokenClient();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-borrows/${encodeURIComponent(user.email)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setborrowBooks(data);
      } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
      }
    };

    fetchBooks();
  }, [user?.email]);

  const handleReturn = async (borrowId, email, bookCopies) => {
    const token = await getTokenClient();
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-borrows/${email}/${borrowId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await result.json();

      if (result.ok && (data.acknowledged || data.insertedId || data.success)) {
        toast.success("Book successfully removed!");
      } else {
        toast.error(data.message || "Failed to remove book. Please try again.");
      }

      const updateResult = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${borrowId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            copies: bookCopies + 1,
          }),
        },
      );

      if (!updateResult.ok) {
        toast.error("Borrow saved, but book copies update failed!");
        return;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing book:", error);
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
            <BookMarked className="h-3.5 w-3.5" />
            <span>Active Loans</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            My Borrowed Books
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your currently borrowed titles, keep track of due dates, and
            return books when you finish.
          </p>
        </div>

        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted hover:border-primary/50 transition-all self-start sm:self-auto"
        >
          <BookOpen className="h-4 w-4 text-primary" />
          <span>Browse More</span>
        </Link>
      </div>

      {borrowbooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowbooks.map((book) => (
            <div
              key={book._id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40"
            >
              <div>
                <div className="flex gap-4">
                  <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-base text-foreground line-clamp-1 pt-0.5">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      by {book.author}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mt-4 pt-3 border-t border-border">
                  {book.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-3">
                <button
                  onClick={() =>
                    handleReturn(book._id, user?.email, book.copies)
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 shadow-sm transition-all cursor-pointer"
                >
                  <CornerDownLeft className="h-3.5 w-3.5" />
                  <span>Return Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-card p-8">
          <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">
            No Borrowed Books
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            You currently have no books checked out. Explore our collection and
            borrow one today!
          </p>
          <Link
            href="/all-books"
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
          >
            <span>Browse Library</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
