import { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ postId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser?.token;

    try {
      await axios.post(
        `/api/comments/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

return (
  <div className="mt-6 space-y-4">
    {/* Comment input */}
    {authUser && (
      <form onSubmit={handleComment} className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md"
        >
          Post
        </button>
      </form>
    )}

    {/* Comments list */}
    <div className="space-y-3">
      {comments.map((c) => (
        <div
          key={c._id}
          className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-200 shadow-sm"
        >
          <span className="font-semibold text-blue-600 dark:text-blue-400">@{c.user.username}</span>: {c.text}
        </div>
      ))}
    </div>
  </div>
);

};

export default CommentSection;
