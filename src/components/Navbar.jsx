import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
// console.log(authUser.user._id);
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };
return (
    <nav className="bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-700 px-6 py-3 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent tracking-wide"
        >
          SocialApp
        </Link>

        {/* Right Section */}
        {authUser?.user ? (
          <div className="flex items-center gap-4">
            {/* Profile Link */}
            <Link
              to={`/profile/${authUser.user.id || authUser.user._id}`}
              className="flex items-center gap-2 group"
            >
              {authUser.user.avatar ? (
                <img
                  src={authUser.user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 shadow-md"
                />
              ) : (
                <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {authUser.user.username[0].toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition duration-200">
                @{authUser.user.username}
              </span>
            </Link>

            {/* Edit Profile */}
            <Link
              to={`/edit-profile/${authUser.user.id || authUser.user._id}`}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 font-medium transition"
            >
              Edit Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 font-medium transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
