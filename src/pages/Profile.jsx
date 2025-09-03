import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;
  console.log(id);

  useEffect(() => {
    const fetchProfile = async () => {
        
      try {
        const res = await axios.get(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);

        
      } catch (err) {
        console.error("Profile load error", err);
      }
    };

    fetchProfile();
  }, [id, token]);


  if (!profile) return <p className="text-center mt-20">Loading profile...</p>;
  console.log(profile);

  const isOwnProfile = profile._id === authUser?.user?.id || profile._id === authUser?.user?._id;
  const isFollowing = profile.followers.includes(authUser?.user?.id) || profile.followers.includes(authUser?.user?._id);

return (
  <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-lg transition-all duration-300">
    <div className="flex items-center gap-5 mb-5">
      {/* Avatar */}
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt="profile avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm"
        />
      ) : (
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
          {profile.username[0].toUpperCase()}
        </div>
      )}

      {/* Username & Bio */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">@{profile.username}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {profile.bio || "No bio yet"}
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
      👥 <span className="font-semibold">{profile.followers.length}</span> followers •{" "}
      <span className="font-semibold">{profile.following.length}</span> following
    </div>

    {/* Follow/Unfollow Button */}
    {!isOwnProfile && authUser && (
      <button
        onClick={isFollowing ? handleUnfollow : handleFollow}
        className={`mt-6 px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300
          ${
            isFollowing
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    )}
  </div>
);

};

export default Profile;
