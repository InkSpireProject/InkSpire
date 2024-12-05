'use client'
import React,{useEffect, useState} from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loading from "./Loading/Loading";
//username=${user?.username}&amount=${duration*book.price}&bookId=${slugString}&duration=${duration}
const CheckoutPage=({amount,username, bookId, duration}:{amount:number,username:string,bookId:string, duration:string})=>{
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetch("/api/create-payment-intent",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({amount:convertToSubcurrency(amount)}),
        })
        .then((res)=>res.json())
        .then((data)=> setClientSecret(data.clientSecret));
    },[amount])

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setLoading(true);
        if(!stripe || !elements){
            return;
        }

        const {error:submitError}= await elements.submit();

        if(submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url: `http://www.localhost:3000/payment-success?username=${username}&amount=${amount}&bookId=${bookId}&duration=${duration}`,
            }
        })
        if(error){
            //only occurs when there is an immediate error while processing payment
            setErrorMessage(error.message);
        }else{
            //add success animation
            //customer is redirect to cart page
        }

        setLoading(false);
    };

    if(!clientSecret || !stripe || !elements){
        return <Loading/>
    }


    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement/>}
            {errorMessage &&<div>{errorMessage}</div>}
            
            <button  disabled={!stripe || loading }
            className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
                {!loading?`Pay $${amount}`:"Processing..."}</button>
        </form>
    )
}

export default CheckoutPage;