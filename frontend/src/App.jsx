import { Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/signup/SignupPage";
import LoginPage from "./pages/auth/login/loginPage";
import NotificationPage from "./pages/notification/NotificationPage";

// components
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import ProfilePage from "./pages/profile/profilePage";

const App = () => {
  return (
    <div className="min-h-screen max-w-6xl font-inter flex mx-auto text-white">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  );
};
export default App;
