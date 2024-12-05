import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/server/connectToDB';
import { User } from '@/server/models/usermodels';
import Book from '@/server/models/bookmodels';
import Cart from '@/server/models/cartmodel';
import Rent from '@/server/models/rentmodels'; 

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('id');

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required", status: false },
                { status: 400 }
            );
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }

        const username = deletedUser.username;

        const deletedBooks = await Book.deleteMany({ username });

        const deletedCarts = await Cart.deleteMany({ username });

        const deletedRents = await Rent.deleteMany({ username });

        return NextResponse.json(
            {
                message: "User and associated data deleted successfully",
                deletedUser,
                deletedBooks: deletedBooks.deletedCount,
                deletedCarts: deletedCarts.deletedCount,
                deletedRents: deletedRents.deletedCount,
                status: true
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error ', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false },
            { status: 500 }
        );
    }
}
