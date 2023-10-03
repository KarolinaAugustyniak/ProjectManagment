import MyProfile from "../components/MyProfile";
import OutdatedTasks from "../components/OutdatedTasks";
import Projects from "../components/Projects";
import UpcomingTasks from "../components/UpcomingTasks";
import Layout from "../layouts/Layout";

export default function Dashboard() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <Layout>
      <h1 className="main-title dashboard__heading">Dashboard</h1>
      <div className="dashboard">
        <h2 className="dashboard__title">Hello,</h2>
        <p className="dashboard__date">Today is {formattedDate}</p>
        <div className="dashboard__wrapper">
          <div className="dashboard__left">
            <UpcomingTasks />
            <OutdatedTasks />
          </div>
          <div className="dashboard__right">
            <MyProfile />
            <Projects />
          </div>
        </div>
      </div>
    </Layout>
  );
}
