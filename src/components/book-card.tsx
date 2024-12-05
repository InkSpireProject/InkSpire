"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { BookOpen, Star } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  lender: string;
  coverImage: string;
  price: number;
}
interface Review {
  rating: number;
  reviewText: string;
  userId: { username: string };
  createdAt: string;
}

export function BookCardComponent({
  id,
  title,
  author,
  lender,
  coverImage,
  price,
}: BookCardProps) {
  const router = useRouter();
  const { user } = useUser();
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/addReview/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        const reviews = result.reviews;
        setRatings(reviews.length);
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

    fetchReviews();
  }, [id]);

  const handleCart = async () => {
    try {
      const response = await axios.post(`/api/addtocart/${id}`, {
        username: user?.username,
      });
      if (response.data.status === true) {
        router.push("/cart");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Issue. Try again later");
    }
  };
  return (
    <Card className="w-[250px] overflow-hidden group">
      <div className="relative">
        <AspectRatio ratio={2 / 3} className="bg-muted">
          <Image
            src={coverImage}
            alt={`Cover of ${title}`}
            fill
            className="object-cover"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-x-0 bottom-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{author}</span>
            </div>
            <div className="text-sm font-medium text-green-600">
              ${price.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <PersonIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">Lent by {lender}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Star className="w-3 h-3 mr-1 flex-shrink-0 text-yellow-400" />
            <span>{avgRating}</span>
            <span className="mx-1">•</span>
            <span>
              {ratings} {ratings <= 1 ? "rating" : "ratings"}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              asChild
            >
              <Link href={`/library/${id}`}>Rent Now</Link>
            </Button>
            <Button
              className="w-full bg-[#203e76] hover:bg-[#2a4b8d] text-white"
              onClick={handleCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
