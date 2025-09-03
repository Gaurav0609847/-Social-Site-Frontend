import { useState } from "react";
import axios from "axios";

const FollowButton = ({ targetUser }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  // Set initial state once based on passed-in props
  const [following, setFollowing] = useState(() =>
    targetUser?.followers?.includes(authUser.user.id || authUser.user._id)
  );

  const [loading, setLoading] = useState(false);

  const handleToggleFollow = async () => {
    setLoading(true);
    try {
      await axios.put(
        `/api/users/${targetUser._id || targetUser.id}/${following ? "unfollow" : "follow"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing(!following);
    } catch (err) {
      console.error(
        "❌ Follow error:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Don't show button if user is viewing their own profile/post
  if (authUser.user.id === targetUser._id) return null;

return (
  <button
    onClick={handleToggleFollow}
    disabled={loading}
    className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-300 shadow-sm
      ${
        following
          ? "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          : "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-600 dark:hover:bg-blue-600"
      }
      ${loading && "opacity-60 cursor-not-allowed"}
    `}
  >
    {loading ? (
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Loading</span>
      </div>
    ) : following ? (
      "Unfollow"
    ) : (
      "Follow"
    )}
  </button>
);

};

export default FollowButton;
