"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Edit3,
  ArrowLeft,
  Book,
  User,
  Mail,
  Image as ImageIcon,
  FileText,
  Layers,
  Tag,
} from "lucide-react";

function BookUpdateFormInner({ bookId }) {
  const defaultBook =
    initialBooks.find((b) => b.id === bookId) || initialBooks[0];

  const [formData, setFormData] = useState({
    title: defaultBook.title,
    author: defaultBook.author,
    category: defaultBook.category,
    image: defaultBook.image,
    description: defaultBook.description,
    copies: defaultBook.copies,
    userName: defaultBook.addedBy,
    userEmail: defaultBook.addedEmail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Book information updated successfully!");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/my-books"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Books</span>
        </Link>
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2">
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit Details</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Update Book Information
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
          Modify book details, modify available copies, or update metadata.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl transition-all">
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
                value={formData.title}
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
                value={formData.author}
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
                value={formData.category}
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
                value={formData.copies}
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
              <span className="text-xs text-muted-foreground">
                Upload to ImgBB / PostImage & paste URL
              </span>
            </label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
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
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Uploader Information
            </h3>
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
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
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
                  value={formData.userEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="h-5 w-5" />
              <span>Update Book</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BookUpdateForm() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id") || "1";

  return <BookUpdateFormInner key={bookId} bookId={bookId} />;
}

export default function BookUpdatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <BookUpdateForm />
    </Suspense>
  );
}
