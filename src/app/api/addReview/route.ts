import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/server/connectToDB";
import Books from "@/server/models/bookmodels";
import Review from "@/server/models/reviewmodel";
import { User } from "@/server/models/usermodels";

export async function POST(req: NextRequest) {
  try {
    const { username, rating, reviewText, bookId } = await req.json();

    // Validate required data
    if (!bookId || !username || rating == null || !reviewText) {
      return NextResponse.json(
        {
          message: "Book ID, username, rating, and reviewText are required",
          status: false,
        },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", status: false },
        { status: 404 }
      );
    }
    // console.log(user);
    // Check if the book exists
    const book = await Books.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { message: "Book not found", status: false },
        { status: 404 }
      );
    }

    // Create and save the new review
    const newReview = new Review({
      bookId: book._id,
      userId: user._id,
      rating,
      reviewText,
    });

    await newReview.save();

    return NextResponse.json(
      {
        message: "Review added successfully",
        status: true,
        review: newReview,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Review cannot be added", status: false },
      { status: 500 }
    );
  }
}
