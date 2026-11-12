"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  PlusCircle,
  Book,
  User,
  Mail,
  Image as ImageIcon,
  FileText,
  Layers,
  Tag,
} from "lucide-react";
import { token, useSession } from "@/lib/auth-client";
import getTokenClient from "@/lib/getTokenClient";

export default function AddBookPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    copies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElementsData = new FormData(form);

    const tokenData = await getTokenClient();

    const newBook = {
      ...Object.fromEntries(formElementsData.entries()),
      userName: user?.name || "",
      userEmail: user?.email || "",
    };

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData}`,
          },
          body: JSON.stringify(newBook),
        },
      );
      const data = await result.json();
      console.log("New Book Data:", newBook);
      console.log("Server Response:", data);

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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-3xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Contribute to Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Add New Book
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
          Share a book with our reading community. Fill in the details below to
          publish it to our catalog.
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

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Book</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
