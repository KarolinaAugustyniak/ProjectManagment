import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const token = localStorage.getItem("token");

  return token ? (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
