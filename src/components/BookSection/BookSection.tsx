"use client"
import Image from 'next/image'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

function BookSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col justify-center items-center h-[500px] w-full gap-[20px] bg-gradient-to-b from-gray-100 to-red-100 p-8"
    >
      <h1 className="font-bold text-3xl text-red-950 mb-4">Popular Picks</h1>

      <div className="flex gap-8">
        <Image
          className="p-2 border-solid border-2 border-gray-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          src="/kafka1.jpg"
          alt="Kafka Book"
          height={200}
          width={200}
        />
        <Image
          className="p-2 border-solid border-2 border-gray-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          src="/jb.jpg"
          alt="JB Book"
          height={200}
          width={200}
        />
        <Image
          className="p-2 border-solid border-2 border-gray-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          src="/rdpd.jpg"
          alt="Rich Dad Poor Dad Book"
          height={200}
          width={200}
        />
        <Image
          className="p-2 border-solid border-2 border-gray-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          src="/rb.jpg"
          alt="RB Book"
          height={200}
          width={200}
        />
      </div>

      {/* Reveal button when component is in view */}
      {isInView && (
        <Link href="/library">
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 px-6 py-3 bg-red-700 text-white rounded-full shadow-lg hover:bg-red-950 transition-colors"
          >
            Go to Library
          </motion.button>
        </Link>
      )}
    </motion.div>
  )
}

export default BookSection
