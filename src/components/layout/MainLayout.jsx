import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../services/auth/authStore";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const user = useAuthStore((state) => state.user);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [showProfile, setShowProfile] = useState(false);

  console.log(user);
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>

      {isAuthenticated && (
        <div className="user-profile-container">
          <button
            className="avatar-button"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src={user?.avatarUrl || "https://www.gravatar.com/avatar?d=mp"}
              alt="Avatar"
            />
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <strong>{user?.fullName || user?.name || "Usuario"}</strong>

              <small>{user?.email}</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
