import { NextRequest, NextResponse } from 'next/server';
import connectToDB from "@/server/connectToDB";
import Books from '@/server/models/bookmodels';
import Rent from '@/server/models/rentmodels';
import { User } from '@/server/models/usermodels';
import Cart from '@/server/models/cartmodel';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const username = url.searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { message: "Username is required", status: false }, 
                { status: 400 }
            );
        }   

        await connectToDB();
        
        // Need to await the User.findOne() query
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }

        const cartBooks = await Cart.find({ username }).populate('book');
        
        return NextResponse.json({
            books: cartBooks,
            message: "Successfully retrieved cart books",
            status: true
        }, {
            status: 200
        });
            
    } catch (error) {
        console.error('Error ', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}

