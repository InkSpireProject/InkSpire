import { NextRequest, NextResponse } from 'next/server';
import connectToDB from "@/server/connectToDB";
import Review from '@/server/models/reviewmodel';  // Review model
import Books from '@/server/models/bookmodels';  // Book model

export async function GET(req: NextRequest, { params }: { params: { bookId: string } }) {
    try {
        const { bookId } = params;

        if (!bookId) {
            return NextResponse.json(
                { message: "Book ID is required", status: false },
                { status: 400 }
            );
        }

        await connectToDB();

        const book = await Books.findById(bookId);
        if (!book) {
            return NextResponse.json(
                { message: "Book not found", status: false },
                { status: 404 }
            );
        }

        const reviews = await Review.find({ bookId }).populate('userId', 'username');
        
        return NextResponse.json({
            message: "Reviews fetched successfully",
            status: true,
            reviews
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false },
            { status: 500 }
        );
    }
}
