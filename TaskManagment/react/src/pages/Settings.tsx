import { useState } from "react";
import Layout from "../layouts/Layout";
import UserProfileImage from "../components/UserProfileImage";
import GenerateInvitationCode from "../components/GenerateInvitationCode";
import InvitationCodes from "../components/InvitationCodes";
import UserAccountSettings from "../components/UserAccountSettings";
import Invitation from "../interfaces/Invitation";

export default function Settings() {
  const [invitationCodes, setInvitationCodes] = useState<Invitation[]>([]);

  return (
    <Layout>
      <div className="settings">
        <h1 className="main-title ">Settings</h1>
        <section className="settings__section">
          <h2>Account settings</h2>
          <UserAccountSettings />
          <UserProfileImage />
        </section>
        <section className="settings__section">
          <h2>Invitation code</h2>
          <GenerateInvitationCode setInvitationCodes={setInvitationCodes} />
          <InvitationCodes
            invitationCodes={invitationCodes}
            setInvitationCodes={setInvitationCodes}
          />
        </section>
      </div>
    </Layout>
  );
}
