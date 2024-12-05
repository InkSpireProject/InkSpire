"use client";
import React, { useState } from "react";
import { Book } from "@/app/admin/page";
import Link from "next/link";
import { BookCardComponent } from "../book-card";

interface Booksprop {
  books: Book[];
}

const BookList = ({ books }: Booksprop) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on the search term
  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.name.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full mx-auto py-10">
      {books && books.length > 0 ? (
        <div className="max-w-6xl mx-auto relative">
          <Link
            className="cursor-pointer text-center flex justify-center items-center rounded-full bg-[#203e76] hover:bg-[#2a4b8d] px-6 py-2 absolute top-2 right-0 text-white"
            href="/library/addbook"
          >
            Lend
          </Link>
          <div className="flex gap-6 mt-5 mb-8">
            <h1 className="text-3xl font-semibold">
              Browse through our extensive Library
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex items-center ">
            <input
              type="text"
              placeholder="Search by book name or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mx-auto bg-gray-200 py-2 px-6 rounded-full outline-none"
            />
          </div>

          {/* Book Cards */}
          <div className="w-full">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-y-10">
                {filteredBooks.map((book: Book, index) => (
                  <div
                    className="justify-self-center shadow-md rounded-xl"
                    key={book._id}
                  >
                    <BookCardComponent
                      id={book._id}
                      author={book.author}
                      coverImage={book.url}
                      lender={book.username}
                      price={book.price}
                      title={book.name}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-lg font-semibold text-gray-500">
                No books found for "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-[50px] text-bold">No Books Available</div>
      )}
    </div>
  );
};

export default BookList;
