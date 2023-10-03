import MyProfile from "../components/MyProfile";
import OutdatedTasks from "../components/OutdatedTasks";
import ProjectsList from "../components/ProjectsList";
import UpcomingTasks from "../components/UpcomingTasks";
import Layout from "../layouts/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="main-title">Dashboard</h1>
      <div className="dashboard">
        <UpcomingTasks />
        <OutdatedTasks />
        <div>
          <MyProfile />
          <ProjectsList />
        </div>
      </div>
    </Layout>
  );
}
