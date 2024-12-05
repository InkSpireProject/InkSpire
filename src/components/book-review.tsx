"use client";

import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewProps {
  username: string;
  avatarUrl?: string;
  review: string;
  rating: number;
  date: string;
}

export function BookReview({
  username,
  avatarUrl,
  review,
  rating,
  date,
}: ReviewProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {username}
              </h3>
              <time className="text-sm text-gray-500" dateTime={date}>
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center mt-1 mb-2">
              {renderStars(rating)}
              <span className="ml-2 text-sm text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{review}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage
export function ReviewExample() {
  return (
    <div className="p-4 bg-gray-100">
      <BookReview
        username="Alice Johnson"
        avatarUrl="/placeholder.svg?height=50&width=50"
        review="I absolutely loved this book! The characters were well-developed, and the plot kept me engaged from start to finish. Fitzgerald's prose is simply beautiful. Highly recommend for anyone who enjoys classic literature."
        rating={4.5}
        date="2023-06-15"
      />
    </div>
  );
}
