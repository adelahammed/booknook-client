import React from "react";
import BookDetailsContent from "@/components/BookDetailsContent";
import getTokenServer from "@/lib/getTokenServer";

export const instant = false;

const BookDetailsPage = async ({ params }) => {
  const paramsRes = await params;

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${paramsRes.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const book = await res.json();

  return <BookDetailsContent book={book} />;
};

export default BookDetailsPage;
