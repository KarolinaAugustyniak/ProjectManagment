import React from "react";
import Layout from "../layouts/Layout";
import UserProfileImage from "../components/UserProfileImage";
import GenerateInvitationCode from "../components/GenerateInvitationCode";
import InvitationCodes from "../components/InvitationCodes";

export default function Settings() {
  return (
    <Layout>
      <h1 className="main-title">Settings</h1>
      <h2>Account settings</h2>
      <UserProfileImage />
      <h2>Invitation code</h2>
      <GenerateInvitationCode />
      <InvitationCodes />
    </Layout>
  );
}
