"use client";
import Footer from '@/components/footer/Footer';
import React from 'react';
import CheckoutCart from '@/components/CheckoutCart';
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartBook } from '@/components/cart-page';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function page({
  searchParams: { username, amount, cartItems }
}:{
    searchParams:{username:string,amount:string,cartItems:string}
}) {
  const actual_amount = parseInt(amount);

  return (
    <>
      <div className="max-w-6xl mx-auto p-10 text-white text-center bg-gradient-to-tr from-red-500 to-red-950 relative top-[100px]">
        <div className="mb-10">
          <h1 className='text-4xl font-extrabold mb-2'>Inkspire</h1>
          <h2 className='text-2xl'>
            has requested
            <span className="font-bold">${actual_amount}</span>
          </h2>
        </div>
        <Elements stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(actual_amount),
            currency: "usd",
          }}
        >
          <CheckoutCart amount={actual_amount} username={username} cartItems={cartItems} />
        </Elements>
      </div>
    </>
  );
}

export default page;
