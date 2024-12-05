"use client";
import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef } from "react";
import { bookdata } from "@/dummydata";

const ScrollBooks: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useAnimationFrame((time) => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${time * 0.002 % 100}%)`;
    }
  });

  return (
    <div className="overflow-hidden w-full bg-gray-100">
      <div className="flex space-x-6 py-4" ref={scrollRef}>
        {bookdata.map((book) => (
          <motion.div
            key={book.id}
            className="w-48 h-64 rounded-md overflow-hidden shadow-lg flex-shrink-0"
          >
            <img
              src={book.url}
              alt={`Book ${book.id + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {bookdata.map((book) => (
          <motion.div
            key={book.id}
            className="w-48 h-64 rounded-md overflow-hidden shadow-lg flex-shrink-0"
          >
            <img
              src={book.url}
              alt={`Book ${book.id + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollBooks;
