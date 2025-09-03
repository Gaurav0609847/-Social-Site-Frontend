import { useState } from "react";
import axios from "axios";

const LikeButton = ({ postId, initialLiked, initialLikeCount }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      await axios.put(
        `/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(!liked);
      setLikeCount((prev) => prev + (liked ? -1 : 1));
    } catch (err) {
      console.error("Failed to like/unlike post", err);
    } finally {
      setLoading(false);
    }
  };

return (
  <button
    onClick={handleLike}
    disabled={loading}
    className={`group flex items-center gap-1 text-sm font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
      ${liked ? "text-red-500" : "text-gray-500 dark:text-gray-400"}
      hover:scale-[1.05] active:scale-95`}
  >
    {loading ? (
      <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      <>
        <span className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          {likeCount}
        </span>
        <span
          className={`transition-transform duration-300 ${
            liked ? "animate-bounce-once" : "group-hover:scale-110"
          }`}
        >
          ❤️
        </span>
      </>
    )}
  </button>
);

};

export default LikeButton;
