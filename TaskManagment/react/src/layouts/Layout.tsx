import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
