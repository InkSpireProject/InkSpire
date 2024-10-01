// src/app/library/[slug]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBookById } from '@/server/bookData';
import './bookDetails.css';
import Loading from '@/components/Loading/Loading';

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
}

function Page() {
  const { slug } = useParams();
  const [book, setBook] = useState<res_el | null>(null);
  const [loading, setLoading] = useState(true);

  const slugString = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookdata = await getBookById(slugString);
        setBook(bookdata);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  if (loading) {
    return <Loading/>;
  }

  if (!book) {
    return <div>No Book Found</div>;
  }

  return (
    <div className='productDisplay'>
      <div className="pd-left">
      <div className="pd-img-list">
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
      </div>

        <div className="pd-img">
          <img className='pd-main-img' src={book.url} alt={book.name} />
        </div>
      </div>
      <div className="pd-right">
        <span><h1>{book.name}</h1></span>
        <span className='author_name'>{book.author}</span>
        
        <div className="pd-right-star">
          <div className='rating'>(Rating by Inkspire)</div>
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
        </div>

        <div className="pd-right-prices">
          {/* <div className="pd-right-price-old">
            $30
          </div> */}
          <div className="pd-right-price-new">
            ${book.price}
          </div>
        </div>

        <div className="pd-right-description">
            {book.description}
        </div>

        <span className='add_to_cart'>
          <button onClick={() => { console.log("product added to cart") }}>Add to Cart</button>
        </span>
        <span className='rent_now'>
          <button onClick={() => { console.log("Rent Now Clicked") }}>Rent Now</button>
        </span>

        <p className='pd-right-category'><span>Category: </span>Fiction and Literature</p>
        <p className='pd-right-category'><span>Tags: </span>Mystery, Romance</p>
        <p className='pd-right-category'><span>ISBN Number: </span>{book.isbn}</p>
      </div>
    </div>
  );
}

export default Page;
