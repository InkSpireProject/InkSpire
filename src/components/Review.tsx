"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { BookReview } from "./book-review";

interface Review {
  rating: number;
  reviewText: string;
  userId: { username: string };
  createdAt: string;
}

interface NewReview {
  rating: number;
  reviewText: string;
  username: string;
}

const ReviewComponent = ({
  bookId,
  updateRating,
}: {
  bookId: string;
  updateRating: () => Promise<void>;
}) => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("1");
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/addReview/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.status) {
          // console.log(result.reviews);
          setReviews(result.reviews);
        } else {
          console.error("Failed to add review:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = user?.username || "";
    console.log("USERNAME: ", username);
    console.log("rating: ", rating);
    console.log("newReview: ", newReview);
    console.log("bookid: ", bookId);

    try {
      const response = await fetch(`/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          rating,
          reviewText: newReview,
          bookId,
        }),
      });

      const result = await response.json();
      if (result.status) {
        alert("Review added successfully");
        result.review.userId = {
          id: result.review?.userId,
          username: user?.username,
        };
        setReviews((prevReviews) => [result.review, ...prevReviews]);
        setNewReview("");
        updateRating();
      } else {
        console.error("Failed to add review:", result.message);
        alert("Please login to add Review!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full p-6 bg-white pt-20 ">
      <Separator className="h-[1.5px]" />
      <div className="max-w-6xl mx-auto flex pt-10 justify-between ">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Leave a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Input */}
            <label className="block">
              <span className="text-gray-700 font-medium">Rating:</span>
              <select
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>
            </label>

            {/* Review Text */}
            <textarea
              name="reviewText"
              placeholder="Your review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-3 rounded-md font-medium hover:bg-pink-600 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div className="flex-grow max-w-2xl">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
            Reviews
          </h3>
          <ul className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li key={index}>
                  <BookReview
                    date={review.createdAt}
                    rating={review.rating}
                    review={review.reviewText}
                    username={review.userId?.username || ""}
                    avatarUrl={`/defaultprofile.jpg`}
                    key={user?.id}
                  />
                </li>
              ))
            ) : (
              <div className="text-gray-500">
                No Reviews available for this book 🤔
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
