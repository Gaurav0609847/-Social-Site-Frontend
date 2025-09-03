import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile/:id"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
