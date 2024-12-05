"use client";
import Bookpart from "@/components/Bookpart/Bookpart";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Book } from "../admin/page";
function page() {
  const [books, setBooks] = useState<[Book] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("/api/allbooks");
        if (response.data.status === false) {
        } else {
          setBooks(response.data.books || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full relative top-[50px]">
      <Bookpart books={books} />
      <Footer />
    </div>
  );
}

export default page;
