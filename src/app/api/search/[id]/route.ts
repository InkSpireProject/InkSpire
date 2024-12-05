import connectToDB from "@/server/connectToDB";
import Book from "@/server/models/bookmodels";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    console.log(id);
    try {
        await connectToDB();
        const book = await Book.findById(id);

        if (book) {
            return NextResponse.json({ book: book, status: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Book Not Found", status: false }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}