import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [form, setForm] = useState({ username: "", bio: "", avatar: "" });
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("authUser"))?.token;

      const res = await axios.get(`/api/users/${authUser.user._id || authUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        username: res.data.username,
        bio: res.data.bio || "",
        avatar: res.data.avatar || "",
      });
      setPreview(res.data.avatar);
    } catch (err) {
      console.error("Failed to load profile", err.response?.data?.message || err.message);
    }
  };

  fetchProfile();
}, [authUser.user._id || authUser.user.id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    const userId = JSON.parse(localStorage.getItem("authUser"))?.user?._id || JSON.parse(localStorage.getItem("authUser"))?.user?.id;

    const res = await axios.put(
      `/api/users/${userId}`,
      form, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessage("Profile updated successfully!");

    setTimeout(() => {
      localStorage.setItem(
        "authUser",
        JSON.stringify({ ...authUser, user: res.data })
      );
      console.log(res.data);
      navigate(`/profile/${res.data._id || res.data.id}`);
    }, 1500);
  } catch (err) {
    console.error("Update failed:", err.response?.data?.message || err.message);
  }
};



  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={form.bio}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Avatar</label>
          <input type="file" accept="image/*" onChange={handleAvatar} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-full object-cover border"
            />
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
