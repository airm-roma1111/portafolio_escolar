import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
