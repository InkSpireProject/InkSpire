"use client"
import React, { useState } from 'react'
import { searchHandler } from '@/server/bookData';
import Link from 'next/link';

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
}

function Search() {
  const [bookname, setBookname] = useState('');
  const [authorname, setAuthorname] = useState('');
  const [result, setResult] = useState<res_el[] | null>(null)
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response: res_el[] = await searchHandler(bookname, authorname);
  
      if (response === null) {
        setResult(null);
        setError('Book Not Available');
      } else {
        setResult(response); 
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Error searching for book');
    }
  
    setBookname('');
    setAuthorname('');
  };

  return (
    <>
    <div className="flex w-[100%] h-[100px] items-center justify-center gap-[20px]">
        <input className="border-[3px] border-solid p-2 border-gray-400 rounded-md" 
        type="text" 
        placeholder="book title" 
        value={bookname}
        onChange={(e) => setBookname(e.target.value)}
        />
        <input className="border-[3px] border-solid p-2  border-gray-400 rounded-md" 
        type="text" 
        placeholder="book author"
        value={authorname}
        onChange={(e) => setAuthorname(e.target.value)}
        />

        <button className="p-2 bg-red-700 rounded-md px-5 text-white"
        onClick={handleSearch}
        >Search Book
        </button>
    </div>
    <div className="mt-6 mb-8">
      { result && (
        result.map(book => (
          <div>
            <div key={book._id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md m-4">
              <img src={book.url} alt={book.name} className="w-24 h-36 object-cover rounded-md" />
              <div>
                <h3 className="text-xl font-semibold">Title: {book.name}</h3>
                <p className="text-lg">Author: {book.author}</p>
                <p className="text-sm font-bold mt-2">Price: ${book.price}</p>
                <Link href={`/library/${book._id}`}><button className='w-40 border-red-700 border-solid text-red-700 border-2 p-1 mt-4 rounded-md'>Rent</button></Link>
              </div>
            </div>
          </div>
        ))
      )} 
    </div>
    <div>
      {error && <div className="text-red-500 font-semibold flex justify-center">{error}</div>}
    </div>
    </>
  )
}

export default Search;
