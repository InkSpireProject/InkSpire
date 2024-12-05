import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/server/connectToDB';
import { User } from '@/server/models/usermodels';


export async function PUT(req: NextRequest){
    try{
        let body = await req.json();
        const {username} = body;
        if(!username){
            return NextResponse.json({message:"Username not provided", status:false}, {status:404});

        }
        await connectToDB();

        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }

        if(user){
            const newUser = await User.findByIdAndUpdate(user._id,{admin:false});
            const userAfterUpdate = await User.findOne({_id:newUser._id});
            return NextResponse.json({message:"Logged Out Successfully",user:userAfterUpdate, status:true},{status:200});
        }
        

    }catch(error){
        console.error('Error ', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}