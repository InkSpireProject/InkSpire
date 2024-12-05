"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingCart } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import ReviewComponent from "@/components/Review";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import authenticate from "@/server/action";
import { RatingDisplay } from "./rating-display";

interface BookProductPageProps {
  slugString: string;
  title: string;
  author: string;
  lender: string;
  price: number;
  description: string;
  imageSrc: string;
  ISBN: string;
  category?: string;
}

interface Review {
  rating: number;
  reviewText: string;
  userId: { username: string };
  createdAt: string;
}

export function BookProductPageComponent({
  slugString,
  title,
  author,
  lender,
  price,
  description,
  imageSrc,
  ISBN,
  category,
}: BookProductPageProps) {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [input, setInput] = useState(false);
  const [duration, setDuration] = useState<number>(1);
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/addReview/${slugString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const reviews = result.reviews;
      const averageRating =
        reviews.length != 0
          ? reviews.reduce(
              (sum: number, review: Review) => sum + review.rating,
              0
            ) / reviews.length
          : 0;

      setAvgRating(Number(averageRating.toFixed(1)));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [slugString]);

  const handleRent = async () => {
    if (!isSignedIn) {
      const checkUser = async () => {
        await authenticate();
      };
      checkUser();
    }
    if (input) {
      if (price) {
        router.push(
          `http://localhost:3000/payment?username=${user?.username}&amount=${(
            duration * price
          ).toString()}&bookId=${slugString}&duration=${duration.toString()}`
        );
      }
    } else {
      setInput(true);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/addtocart/${slugString}`,
        {
          username: user?.username,
        }
      );
      if (response.data.status === true) {
        router.push("/cart");
      } else {
        setInput(false);
        alert(response.data.message);
      }
    } catch (err) {
      setInput(false);
      alert("Issue. Try again later");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="overflow-hidden max-w-[300px] mx-auto">
            <CardContent className="p-0">
              <Image
                src={imageSrc}
                alt={`Cover of ${title}`}
                width={300}
                height={450}
                className="w-full h-auto object-cover"
              />
            </CardContent>
          </Card>
          {category && (
            <div className="flex justify-center">
              <Badge variant="secondary">{category}</Badge>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex justify-between">
              <p className="text-xl text-gray-600 mb-2">by {author}</p>
              <RatingDisplay rating={avgRating} />
            </div>
            <span className="text-bold text-base text-blue-950">
              {"("}${price}/day{")"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-green-600 w-32">
              ${(price * duration).toFixed(2)}
            </div>
            <Button
              className="bg-pink-500 hover:bg-pink-600"
              onClick={handleRent}
            >
              Rent Now
            </Button>
            <input
              className="w-12 bg-slate-300 h-9 rounded px-2"
              value={duration}
              onChange={(e) =>
                setDuration(
                  parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1
                )
              }
              type="number"
            />
            <Button variant="outline" onClick={handleCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Lent by {lender}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>ISBN: {ISBN}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{description}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Details</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>First published in 1925</li>
              <li>180 pages</li>
              <li>Classic American Literature</li>
            </ul>
          </div>
        </div>
      </div>
      <ReviewComponent bookId={slugString} updateRating={fetchReviews} />
    </div>
  );
}
