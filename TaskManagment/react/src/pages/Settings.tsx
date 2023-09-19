import React from "react";
import Layout from "../layouts/Layout";
import UserProfileImage from "../components/UserProfileImage";

export default function Settings() {
  return (
    <Layout>
      <h1 className="main-title">Settings</h1>
      <UserProfileImage />
    </Layout>
  );
}
