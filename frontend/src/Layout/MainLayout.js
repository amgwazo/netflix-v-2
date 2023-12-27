import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="root-layout w-100">
      <div className="navbar-container">
        <Navbar />
      </div>
      <main className="main-layout">
        <Outlet />
      </main>
    </div>
  );
}
