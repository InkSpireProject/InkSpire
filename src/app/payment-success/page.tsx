"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function page({
  searchParams: { username, bookId, duration, amount },
}: {
  searchParams: { username: string; amount: string; bookId: string; duration: string };
}) {
  const hasCalledAPI = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const postRent = async () => {
      if (hasCalledAPI.current) return; 
      hasCalledAPI.current = true;

      try {
        const response = await axios.post(`/api/rent/${bookId}`, {
          username,
          amount: parseFloat(amount),
          duration: parseInt(duration),
        });
        if (response.data.status) {
          console.log("Book successfully added to Orders");
        } else {
          console.log("Some error occurred while posting to rent route");
        }
      } catch (err) {
        console.error("Error", err);
      }
    };

    postRent();
  }, [bookId, username, amount, duration]);

  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-20 rounded-md bg-gradient-to-tr from-red-500 to-red-950 relative top-[50px]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank You!</h1>
        <h2 className="text-2xl">You Successfully Sent</h2>
        <div className="bg-white p-2 rounded-md text-red-950 mt-5 text-4xl font-bold">
          ${amount}
        </div>
        <button
          className="p-3 bg-white font-bold text-black rounded mt-5 border hover:bg-red-950 hover:text-white transition-all hover:border-white"
          onClick={() => router.push("/orders")}
        >
          Go to Orders
        </button>
      </div>
    </div>
  );
}

export default page;
