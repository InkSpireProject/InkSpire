"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";

interface Book {
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  username: string | null;
}

function Page() {
  const router = useRouter();
  const [book, setBook] = useState<Book>({
    name: "",
    url: "",
    author: "",
    description: "",
    price: 0,
    isbn: "",
    username: localStorage.getItem("username"),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setBook((prevBook) => ({
        ...prevBook,
        url: "/" + file.name,
      }));
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/add", {
        ...book,
        username: book.username,
      });

      if (response.data.status === false) {
        alert(
          "Message: " + (response.data?.message || "Internal Server Error")
        );
      } else {
        router.push("/library");
      }
    } catch (error) {
      console.error("An error occurred while submitting the book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-8 relative mb-10">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl border-t-4 border-pink-400 relative top-[40px]">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Upload Book Information
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-gray-900 font-semibold mb-1">
                Book Name:
              </label>
              <input
                type="text"
                name="name"
                value={book.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
                placeholder="Enter the book name"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-900 font-semibold mb-1">
                Book Cover:
              </label>
              <input
                type="file"
                name="url"
                onChange={handleFileChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-gray-900 font-semibold mb-1">
                Author:
              </label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
                placeholder="Enter the author's name"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-gray-900 font-semibold mb-1">
                ISBN:
              </label>
              <input
                type="text"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
                placeholder="Enter the ISBN"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-gray-900 font-semibold mb-1">
                Description:
              </label>
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
                placeholder="Describe the book"
                rows={4}
              />
            </div>

            {/* Price and Submit Button in the same row */}
            <div className="flex space-x-4 items-end">
              <div className="flex-grow">
                <label className="block text-gray-900 font-semibold mb-1">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={book.price}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-40"
                  placeholder="Enter the price"
                />
              </div>

              <button
                onClick={handleClick}
                className="bg-[#1a2a47] text-white font-bold py-3 px-8 rounded-full hover:bg-[#33415c] transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
