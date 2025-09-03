import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:to-black transition-colors duration-1000">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white dark:bg-[#121212] transition-all duration-500 ease-in-out transform hover:scale-[1.015]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6 animate-fade-in">
          Create Your Account ✨
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            required
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />

          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />

          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 animate-fade-in-up">
          Already have an account?
          <a href="/login" className="text-purple-500 hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
