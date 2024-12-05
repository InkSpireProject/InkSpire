"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function BookRecommendations() {
  const [activeTab, setActiveTab] = useState("For You");
  const router = useRouter();
  const book1 = [
    {
      title: "Rich Dad Poor Dad",
      image: "/rdpd.jpg",
      alt: "Ikigai book cover",
    },
    {
      title: "Pride And Prejudice",
      image: "/Pride.jpeg",
      alt: "Atomic Habits book cover",
    },
    {
      title: "The Hunger Games",
      image: "/Hunger.jpeg",
      alt: "The Power of Your Subconscious Mind book cover",
    },
  ];
  const book2 = [
    {
      title:"The Great Gatsby",
      image:"/great.jpg",
      alt:"F Scott Fitzgerald"
  },
  {
    title:"To Kill a Mockingbird",
    image:"/mocking.jpeg",
      alt:"Harper Lee"
  },
  {
    title:"The lord of the rings",
    image:"/lord.png",
      alt:"J.R.R Tolkien"
  },
  ]
  const book3 = [
    {
      title:"Pride and Prejudice",
      image:"/PRIDE.jpeg",
      alt:"Jane Austen"
  },
  {
    title:"The Catche in the rye",
    image:"/CATCHER.jpeg",
      alt:"J.D Salinfer"
  },
  {
    title:"The Hunger Games",
    image:"/HUNGER.jpeg",
      alt:"Suzanne Collins"
  }
  ]
  const [books,setBooks] = useState(book1);

  const tabs = ["For You", "Genres", "Top selling"];
  useEffect(()=>{
    const changeRecommendation = ()=>{
      if(activeTab===tabs[1]){
        setBooks(book2);
      }
      else if(activeTab===tabs[2]){
        setBooks(book3);
      }
      else{
        setBooks(book1);
      }
    }
    changeRecommendation();
  },[activeTab])

  

  return (
    <section className="p-6 md:p-8 bg-[#001233] rounded-[64px] max-w-6xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4 md:gap-6">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className={cn(
                activeTab === tab
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10",
                "rounded-full"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex justify-evenly min-w-max pb-4">
          {books.map((book, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={book.image}
                  alt={book.alt}
                  width={200}
                  height={300}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <Link
              href="/library"
              className="text-pink-500 hover:text-pink-400 transition-colors text-lg font-medium"
            >
              See all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
