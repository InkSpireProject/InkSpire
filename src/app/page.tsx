import { BookRecommendations } from "@/components/book-recommendations";
import Footer from "@/components/footer/Footer";
import { ProcessSteps } from "@/components/process-steps";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  return (
    <section className="bg-black">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-1/2 left-1/2 w-full object-cover z-10 opacity-40 transform -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/video/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
          <div className="text-center space-y-6">
            <div className="space-y-2 pt-10">
              <h2 className="text-3xl text-white font-medium">Inkspire</h2>
              <h1 className="text-4xl md:text-6xl font-medium text-white">
                Best Online Book Rental Service
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href="/library">
                <button className="bg-pink-600 hover:bg-pink-500 transition-colors duration-200 text-white px-10 py-3 rounded-full">
                  Explore
                </button>
              </Link>
              {!userId && (
                <Link href="/sign-up">
                  <button className="border-2 border-pink-600 text-pink-500 bg-transparent font-semibold px-10 py-3 rounded-full">
                    Sign up
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px py-8 bg-[#f0f0f0] flex justify-center">
        <img src="/publishers.svg" alt="publishers" className="max-w-4xl" />
      </div>

      <div className="bg-white py-24">
        <BookRecommendations />
      </div>

      <ProcessSteps />

      <section className="bg-white w-full">
        <div className="py-24 bg-[url('/choice/bg.png')] bg-repeat-x">
          <div className=" max-w-6xl mx-auto">
            <h1 className="text-center text-xl font-bold mb-10">
              You can take the <span className="text-blue-500">blue pill</span>{" "}
              or the <span className="text-red-500">red pill</span>. The choice
              is yours.
            </h1>
            <div className="flex justify-center">
              <img src="/choice/group.svg" className="max-w-4xl" />
            </div>
          </div>
        </div>
        <div className="w-full h-[600px] flex items-center justify-center">
              <iframe src="https://www.youtube.com/embed/q7Fxxgx2BDY"  className="h-[80%]  w-[70%] shadow-xl rounded-xl" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
        </div>
      </section>
      <Footer />
    </section>
  );
}
