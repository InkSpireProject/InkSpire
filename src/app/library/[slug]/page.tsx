// src/app/library/[slug]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import { BookProductPageComponent } from "@/components/book-product-page";

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  username: string;
}

function Page() {
  const [book, setBook] = useState<res_el | null>(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(
          `/api/search/${slugString}`
        );
        console.log(response);
        if (response.data.book) setBook(response.data.book);
        else {
          alert("message: " + response.data.message);
        }
      } catch (err) {
        alert("An Error occured while fetching book: " + err);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [slugString]);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <div>No Book Found</div>;
  }

  return (
    <div className="pt-20">
      <BookProductPageComponent
        slugString={slugString}
        ISBN={book.isbn}
        author={book.author}
        description={book.description}
        imageSrc={book.url}
        lender={book.username}
        price={book.price}
        title={book.name}
        category=""
      />
    </div>
  );
}

export default Page;
