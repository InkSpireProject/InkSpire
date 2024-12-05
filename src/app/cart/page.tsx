"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import authenticate from "@/server/action";
import { motion } from "framer-motion";
import { CartPageComponent } from "@/components/cart-page";

interface Book {
  _id: string;
  name: string;
  author: string;
  url: string;
  description: string;
  price: number;
  isbn: string;
  username: string;
}

interface CartBook {
  _id: string;
  username: string;
  book: Book;
  duration:number
}

interface ApiResponse {
  books: CartBook[];
  message: string;
  status: boolean;
}

function Page() {
  const { user, isSignedIn } = useUser();
  const [cartBooks, setCartBooks] = useState<CartBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState(false);
  const [duration, setDuration] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [deleteClick, setDeleteClick] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      const checkUser = async () => {
        await authenticate();
      };
      checkUser();
    }
    if (user) {
      const fetchCartBooks = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/addtocart?username=${user.username}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data: ApiResponse = await response.json();
          setCartBooks(data.books);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchCartBooks();
    } else {
      setError("No user found");
      setLoading(false);
    }
  }, [user, deleteClick]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 relative z-0 transition-all duration-300">

      {/* GIF at bottom-right */}
      <div className="fixed bottom-0 right-0 p-4">
        <Image
          src="/gif1.gif"
          alt="Top Right GIF"
          width={100}
          height={100}
          className="object-cover h-[150px] w-[150px]"
        />
      </div>
      <CartPageComponent cartbooks={cartBooks} />
      </div>
  );
}

export default Page;
