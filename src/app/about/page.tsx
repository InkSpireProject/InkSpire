import Footer from "@/components/footer/Footer";
import React from "react";
import ScrollBooks from "@/components/ScrollBooks/ScrollBooks";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white-100 text-gray-900 flex flex-col items-center">
      {/* Hero Section with Image */}
      <div className="relative w-full h-96">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Bookshelf"
          className="w-full relative z-20 opacity-40 h-full object-cover"
        />
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            About Inkspire
          </h1>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto p-8 bg-red-200 rounded-md shadow-lg transform transition mt-10">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Inkspire</span> is more than just a
          book rental platform. We aim to inspire creativity and knowledge by
          providing easy access to literature from all over the world. Whether
          you're looking for the latest bestseller or timeless classics, our
          platform makes it easy for you to find and rent books.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We are committed to promoting the joy of reading and connecting book
          lovers. Our carefully curated selection ensures that there's something
          for everyone.
        </p>
        <p className="text-lg text-gray-700">
          Join us and fuel your imagination, one book at a time.
        </p>
      </div>

      {/* ScrollBooks Component */}
      <ScrollBooks />

      {/* Features Section with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl">
        <div className="flex flex-col items-center p-6 bg-red-200 rounded-md shadow-lg hover:bg-red-300 transition">
          <img
            src="https://img.icons8.com/fluent/96/000000/open-book.png"
            alt="Wide Selection"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Wide Selection
          </h3>
          <p className="text-gray-700 text-center">
            Thousands of books across various genres, handpicked to suit all
            tastes.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-red-200 rounded-md shadow-lg hover:bg-red-300 transition">
          <img
            src="https://img.icons8.com/fluent/96/000000/handshake.png"
            alt="Community"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Reader Community
          </h3>
          <p className="text-gray-700 text-center">
            Join a community of book lovers who share your passion for reading.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-red-200 rounded-md shadow-lg hover:bg-red-300 transition">
          <img
            src="/delivery.png"
            alt="Fast Delivery"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Fast Delivery
          </h3>
          <p className="text-gray-700 text-center">
            Get your books delivered right to your door, quickly and
            efficiently.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
