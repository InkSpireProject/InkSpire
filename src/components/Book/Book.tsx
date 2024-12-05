import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Book() {
  return (
    <div className="flex flex-wrap justify-center gap-10 mt-10 px-4">
      {/* First Box: Rent a Book */}
      <div className="flex w-full sm:w-[45%] h-[350px] border-solid border-2 border-red-300 justify-center items-center gap-5 rounded-md shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:border-red-500 bg-white duration-500">
        <Image
          src="/4set.jpg"
          alt="Book Image"
          height={170}
          width={170}
          className="transition-transform"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-center text-red-800 mb-3">Rent from a wide range of collections</h2>
          <Link href="/library">
            <button className="w-40 border-red-700 border-solid text-red-700 border-2 p-2 mt-4 transition-all rounded-md hover:bg-red-700 hover:text-white hover:border-white h-11 transform hover:scale-105 duration-300">
              Rent a book
            </button>
          </Link>
        </div>
      </div>

      {/* Second Box: Lend a Book */}
      <div className="flex w-full sm:w-[45%] h-[350px] border-solid border-2 border-red-300 justify-center items-center gap-5 rounded-md shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:border-red-500 bg-white duration-500">
        <Image
          src="/got.webp"
          alt="Game of Thrones"
          height={250}
          width={250}
          className="transition-transform"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-center text-red-800 mb-3">Earn Money by Lending books to people</h2>
          <Link href="/library/addbook">
            <button className="w-40 border-red-700 border-solid text-red-700 border-2 p-2 mt-4 rounded-md transition-all hover:bg-red-700 hover:text-white hover:border-white h-11 transform hover:scale-105 duration-300">
              Lend a book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Book;
