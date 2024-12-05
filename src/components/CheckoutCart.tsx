'use client'
import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loading from "./Loading/Loading";
import axios from "axios";

const CheckoutCart = ({ amount, username, cartItems }: { amount: number, username: string, cartItems:string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    //console.log(cartItems);

    // Fetch client secret for Stripe payment
    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        // Submit the payment form
        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        // Confirm payment with Stripe
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success-from-cart?username=${username}&amount=${amount}&cartItems=${cartItems}`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />}
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount.toFixed(2)}` : "Processing..."}
            </button>
        </form>
    );
};

export default CheckoutCart;
