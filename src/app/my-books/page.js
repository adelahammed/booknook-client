"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  BookOpen,
  Edit3,
  Trash2,
  PlusCircle,
  AlertCircle,
  Book,
  User,
  Tag,
  Layers,
  Image as ImageIcon,
  FileText,
  Mail,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getTokenClient from "@/lib/getTokenClient";

export default function MyBooksPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getTokenClient();
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const myBooks = books.filter((book) => book.userEmail === user?.email);

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      copies: book.copies || "",
      image: book.image || "",
      description: book.description || "",
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElementsData = new FormData(form);
    const bookUpdate = {
      ...Object.fromEntries(formElementsData.entries()),
    };

    const token = await getTokenClient();

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${selectedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookUpdate),
        },
      );
      const data = await result.json();

      if (result.ok && (data.acknowledged || data.insertedId || data.success)) {
        toast.success("Book successfully updated!");
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Something went wrong. Please check your connection.");
    }
  };
  const handleDelete = async (id) => {
    const token = await getTokenClient();

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`,
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
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to remove book. Please try again.");
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
            <BookOpen className="h-3.5 w-3.5" />
            <span>Contributions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            My Books
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the books you have added to the community library. Update
            information or remove entries.
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
                  <tr
                    key={book._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
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
                        <button
                          onClick={() => handleUpdateClick(book)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Update</span>
                        </button>

                        <button
                          onClick={() => handleDelete(book._id)}
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

          <h3 className="text-lg font-bold text-foreground">
            No Books in Your List
          </h3>

          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            You haven&apos;t added any books yet or have deleted all entries.
            Share a book today!
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-full  max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Update Book Information
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary" />
                  <span>Book Title *</span>
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. The Great Gatsby"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Author Name *</span>
                </label>

                <input
                  type="text"
                  name="author"
                  required
                  placeholder="e.g. F. Scott Fitzgerald"
                  value={formData.author || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Category *</span>
                </label>

                <select
                  name="category"
                  required
                  value={formData.category || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <span>Total Copies *</span>
                </label>

                <input
                  type="number"
                  name="copies"
                  min="1"
                  required
                  placeholder="e.g. 5"
                  value={formData.copies || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <span>Book Image URL *</span>
                </span>
              </label>

              <input
                type="url"
                name="image"
                required
                placeholder="https://i.ibb.co/example/book-cover.jpg"
                value={formData.image || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>Short Description *</span>
              </label>

              <textarea
                name="description"
                required
                rows={4}
                placeholder="Provide a concise summary or synopsis of the book..."
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Edit3 className="h-5 w-5" />
                <span>{loading ? "Updating..." : "Update Book"}</span>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
