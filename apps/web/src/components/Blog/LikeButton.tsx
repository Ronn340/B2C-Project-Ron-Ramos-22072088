"use client";
import { toggleLike } from "@/actions/toggleLike";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";

export function LikeButton({ postId, likes, isLiked}: { postId: number; likes: number; isLiked: boolean }) {
    const [liked, setLiked] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(likes);
    async function handleLike() {
        //Toggle everything
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        await toggleLike(postId);
    }
    return (
        <button onClick={handleLike} data-test-id="like-button" className="flex items-center gap-2">

            {liked ? (
                <Heart className="w-4 h-4 fill-red-500 text-red-500 hover:text-secondary hover:fill-white" />
            ) : (
                <Heart 
                    className="w-4 h-4 text-secondary hover:fill-red-500 hover:text-red-500"  />
            )}
            <span className="text-sm text-gray-500">{likeCount} likes</span>
        </button>
    );
}