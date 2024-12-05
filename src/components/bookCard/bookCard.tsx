import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';

interface res_el {
    _id: string;
    name: string;
    url: string;
    author: string;
    description: string;
    price: number;
    isbn: string;
    username:string
}

function BookCard({ data }:{data: res_el}) {
  return (
    <div className='w-[100%] h-[200px] flex justify-center items-center shadow-xl'>
      <div className="w-[60%] h-[95%] flex justify-center items-center border-solid border-2 p-2">
        <Image className="w-full h-full rounded-md object-cover" src={data.url} alt="" height={500} width={500}/>
      </div>
      <div className='flex w-full h-full justify-center items-center flex-col'>
        <h2 className='text-bold'>{data.name}</h2>
        <h3 className='text-sm'>{data.author}</h3>
        <h3 className='text-sm'>{"Lender: "+data.username}</h3> <Button
              className="w-[70%] mt-2 bg-pink-500 hover:bg-pink-600 text-white"
              asChild
            >
              <Link href={`/library/${data._id}`}>Rent Now</Link>
            </Button>
      </div>
    </div>
  )
}

export default BookCard
