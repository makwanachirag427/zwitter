import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
// pages
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/signup/SignupPage";

import NotificationPage from "./pages/notification/NotificationPage";

// components
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import ProfilePage from "./pages/profile/ProfilePage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import LoginPage from "./pages/auth/login/LoginPage";



const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.status == 401) {
          return null;
        }
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here", data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return  (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl font-inter flex mx-auto ">
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage/> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
};
export default App;
