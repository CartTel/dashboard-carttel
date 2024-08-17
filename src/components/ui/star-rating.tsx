'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface StarRatingProps {
    totalStars?: number;
    onRatingChange?: (rating: number) => void;
    initialRating?: number
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRatingChange, initialRating }) => {
    const [rating, setRating] = useState(initialRating ? initialRating : 0);

    const handleStarClick = (index: number) => {
        // console.log("first..", initialRating)
        const newRating = index + 1;
        // Only update rating if it's different from the current rating
        if (!initialRating) {
            // console.log("for", initialRating, newRating, rating)
            if (initialRating === 0) {
                setRating(0);
            } else {
                setRating(newRating);
            }

            if (onRatingChange) {
                onRatingChange(newRating); // Call only if onRatingChange is provided
            }
        }
        if (onRatingChange) {

        }
    };

    return (
        <div className="flex items-center space-x-2">
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    className={`text-5xl cursor-pointer w-[28px] h-[48px] leading-1 text-center inline-block 
                    ${index < rating ? 'text-yellow-500' : 'text-[#D9D9D9]'
                        }`}
                    onClick={() => handleStarClick(index)}
                >
                    <Image
                        src={index < rating ? '/images/star.svg' : '/images/empty-star.svg'}
                        alt={index < rating ? 'filled' : 'empty'}
                        width={20}
                        height={20}
                    />
                </span>
            ))}
        </div>
    );
};

export default StarRating;
