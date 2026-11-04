"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { initialBooks } from "@/data/books";
import { BookOpen, Edit3, Trash2, PlusCircle, AlertCircle } from "lucide-react";

export default function MyBooksPage() {
  const [myBooks, setMyBooks] = useState(initialBooks.slice(0, 5));

  const handleDelete = (id, title) => {
    setMyBooks((prev) => prev.filter((book) => book.id !== id));
    toast.success(`"${title}" deleted successfully`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Contributions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            My Books
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the books you have added to the community library. Update information or remove entries.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:opacity-95 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Book</span>
        </Link>
      </div>

      {myBooks.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-4 px-6">Book Details</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Author</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 hidden md:table-cell">Copies</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {myBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/book-details?id=${book.id}`}
                            className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {book.title}
                          </Link>
                          <span className="text-xs text-muted-foreground sm:hidden block mt-0.5">
                            by {book.author}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 hidden sm:table-cell text-muted-foreground font-medium">
                      {book.author}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {book.category}
                      </span>
                    </td>

                    <td className="py-4 px-6 hidden md:table-cell text-muted-foreground">
                      {book.copies} available
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/book-update?id=${book.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Update</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(book.id, book.title)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-card p-8">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">No Books in Your List</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            You haven&apos;t added any books yet or have deleted all entries. Share a book today!
          </p>
          <Link
            href="/add-book"
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      )}
    </div>
  );
}
