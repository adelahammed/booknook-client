import BookDetailsContent from "@/components/BookDetailsContent";
import { notFound } from "next/navigation";

export default async function BookDetailsPage({ params }) {
  const paramsRes = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${paramsRes.id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Failed to fetch book details");
  }

  const book = await res.json();

  if (!book) {
    notFound();
  }

  return <BookDetailsContent book={book} />;
}
