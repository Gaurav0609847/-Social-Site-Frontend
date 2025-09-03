import { useEffect, useState } from "react";
import axios from "axios";
import LikeButton from "../components/LikeButton";
import CreatePost from "../components/CreatePost";
import CommentSection from "../components/CommentSection";
import FollowButton from "../components/FollowButton";
import { format } from "timeago.js";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
      // console.log(posts);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8 tracking-tight">
        📰 Your Feed
      </h1>

      {authUser && <CreatePost onPostCreated={fetchPosts} />}

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 animate-spin" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-800 to-purple-800 blur-md opacity-30 animate-pulse" />
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-black dark:border-white animate-spin" />
          </div>
          <span className="ml-3  text-gray-700  animate-pulse">
            Loading posts...
          </span>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5 duration-300"
            >
              {/* Author Info */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {post.author.username[0].toUpperCase()}
                    </div>
                  )}

                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      @{post.author.username}
                    </span>{" "}
                    <span className="ml-1 text-xs text-gray-500">
                      • {format(post.createdAt)}
                    </span>
                  </div>
                </div>

                {(authUser?.user._id !== post.author._id ||
                  authUser?.user.id !== post.author.id) && (
                  <FollowButton targetUser={post.author} />
                )}
              </div>

              {/* Post Content */}
              <p className="text-gray-800 dark:text-gray-100 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Like Button */}
              <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                {authUser && (
                  <LikeButton
                    postId={post._id || post.id}
                    initialLiked={post.likes.includes(
                      authUser.user._id || authUser.user.id
                    )}
                    initialLikeCount={post.likes.length}
                  />
                )}
              </div>

              {/* Comments */}
              <CommentSection postId={post._id || post.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
