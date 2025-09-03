import { useState } from "react";
import axios from "axios";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      return setError("Post content cannot be empty");
    }

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser?.token;

    try {
      await axios.post(
        "/api/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      onPostCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

return (
  <div className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl mb-8 transition-all duration-500">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Animated Textarea */}
      <textarea
        rows={content.length > 120 ? 5 : 3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full text-sm px-5 py-3 resize-none rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 shadow-inner"
      />

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 italic">{error}</p>
      )}

      {/* CTA Button */}
      <button
        type="submit"
        className="self-end px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      >
        🚀 Post
      </button>
    </form>
  </div>
);

};

export default CreatePost;
