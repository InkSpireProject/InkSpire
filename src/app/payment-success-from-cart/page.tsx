'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Book } from '../admin/page';

// Define the cart item type
interface CartItem {
  _id: string;
  username:string;
  price: number;
  duration: number;
}

function Page({
  searchParams: { username, amount, cartItems },
}: {
  searchParams: { username: string; amount: string; cartItems: string };
}) {
  const router = useRouter();
  const hasCalledAPI = useRef(false);
  const [allItemsAdded, setAllItemsAdded] = useState(false); // Track API calls completion

  // Parse cart items from JSON string
  console.log(cartItems)
  const parsedCartItems: CartItem[] = JSON.parse(cartItems);

  useEffect(() => {
    const postRent = async (item: CartItem) => {
      try {
        const response = await axios.post(`/api/rent/${item._id}`, {
          username,
          amount: item.price * item.duration,
          duration: item.duration,
        });
        if (response.data.status) {
          console.log(`Book ${item._id} successfully added to Orders`);
        } else {
          console.log(`Error occurred while adding book ${item._id} to Orders`);
        }
      } catch (err) {
        console.error("Error posting to rent route:", err);
      }
    };

    const addAllItems = async () => {
      if (hasCalledAPI.current) return;
      hasCalledAPI.current = true;

      // Loop through each cart item and post to rent API
      for (const item of parsedCartItems) {
        await postRent(item);
      }

      // After all items are added, set the state to show the "Go to Orders" button
      setAllItemsAdded(true);
    };

    addAllItems();
  }, [parsedCartItems, username]);

  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-20 rounded-md bg-gradient-to-tr from-red-500 to-red-950 relative top-[50px]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank You!</h1>
        <h2 className="text-2xl">You Successfully Sent</h2>
        <div className="bg-white p-2 rounded-md text-red-950 mt-5 text-4xl font-bold">
          ${amount}
        </div>
        
        {/* Only show the button after all API calls are complete */}
        {allItemsAdded && (
          <button
            className="p-3 bg-white font-bold text-black rounded mt-5 border hover:bg-red-950 hover:text-white transition-all hover:border-white"
            onClick={() => router.push("/orders")}
          >
            Go to Orders
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
