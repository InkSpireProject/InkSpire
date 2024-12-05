'use client'

import { Star, StarHalf } from "lucide-react"

interface RatingProps {
  rating: number
  className?: string
}

export function RatingDisplay({ rating, className = "" }: RatingProps) {
  const roundedRating = Math.round(rating * 2) / 2 // Round to nearest 0.5

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(roundedRating)
    const hasHalfStar = roundedRating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-star-${i}`}
          className="w-5 h-5 text-gray-300"
          aria-hidden="true"
        />
      )
    }

    return stars
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex mr-2" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
        {renderStars()}
      </div>
      <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  )
}

// Example usage
export function RatingExample() {
  return (
    <div className="p-4 space-y-4">
      <RatingDisplay rating={4.5} />
      <RatingDisplay rating={3.7} />
      <RatingDisplay rating={2.0} />
    </div>
  )
}