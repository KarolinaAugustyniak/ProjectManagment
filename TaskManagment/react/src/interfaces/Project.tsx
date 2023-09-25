import Organization from "./Organization";
import Task from "./Task";
import UserData from "./User";

interface Project {
  projectId: number;
  projectName: string;
  createdAt: string;
  createdBy: number;
  organizationId: number;
  user: UserData;
  organization: Organization;
  tasks: Task[];
}

export default Project;
