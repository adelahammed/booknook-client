import BookCard from "@/components/BookCard";

export default async function AllBooksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
    cache: "no-store",
  });
  const books = await res.json();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
            <span>Community Shelves</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
            All Books
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Browse through our wide repository of books across various
            categories. Find your next favorite read and borrow today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
