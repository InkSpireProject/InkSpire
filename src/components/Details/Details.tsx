"use client";
import React, { useState } from 'react';
import { Book, Cart, Rent } from '@/app/admin/page';


interface DetailsProps {
  rented: Rent[];
  cart: Cart[];
  lended: Book[];
}

function Details({ rented, cart, lended }:DetailsProps) {
  const [cancel, setCancel] = useState(false);
  
  return (
    !cancel && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-4/5 h-4/5 overflow-auto">
          <div className="mb-4">
            <h2 className="font-bold text-lg">Rented Books</h2>
            {rented.length > 0 ? (
              rented.map((rent) => (
                <div key={rent.book._id} className="border-b py-2">
                  <span className="block">Rent Id:{rent._id}</span>
                  <span className="block">Book Name:{rent.book.name}</span>
                  <span className="block">Book Author:{rent.book.author}</span>
                  <span className="block">Book Price:{rent.book.price}</span>
                  <span className="block">Book Lender:{rent.book.username}</span>
                </div>
              ))
            ) : (
              <p>No books rented</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-lg">Books in Cart</h2>
            {cart.length > 0 ? (
              cart.map((p) => (
                <div key={p.book._id} className="border-b py-2">
                  <span className="block">Cart{p._id}</span>
                  <span className="block">Book Name:{p.book.name}</span>
                  <span className="block">Book Author:{p.book.author}</span>
                  <span className="block">Book Price:{p.book.price}</span>
                  <span className="block">Book Lender:{p.book.username}</span>
                </div>
              ))
            ) : (
              <p>No books in cart</p>
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg">Books Lended by User</h2>
            {lended.length > 0 ? (
              lended.map((p) => (
                <div key={p._id} className="border-b py-2">
                  <span className="block">Book Id:{p._id}</span>
                  <span className="block">Book name:{p.name}</span>
                  <span className="block">Book author:{p.author}</span>
                  <span className="block">Book description:{p.description}</span>
                </div>
              ))
            ) : (
              <p>No books lended</p>
            )}
          </div>
          <button className="p-2 border-2 border-red-950" onClick={() => setCancel(true)}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

export default Details;
