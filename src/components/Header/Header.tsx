import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center bg-black">
      {" "}
      {/* Centering the content */}
      {/* Background Image */}
      {/* <Image
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        src="/background.jpg"
        alt="Background"
        height={1000}
        width={1000}
      /> */}
      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col items-center text-center gap-4">
        <h1 className="text-6xl font-serif text-red-100">
          Your Gateway to Infinite Worlds!
        </h1>
        <p className="w-2/3 mt-5 text-xl text-white">
          Welcome to InkSpire, where your literary adventures begin! Dive into a
          vast collection of books, from timeless classics to the latest
          bestsellers
        </p>
        <Link href="/library">
          <button className="w-40 h-12 border-white border-solid text-white border-2 p-1 mt-6 rounded-md bg-red-700 hover:bg-red-100 hover:text-red-950 hover:border-red-950 transition-all">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
