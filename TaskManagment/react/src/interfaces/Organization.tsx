import Project from "./Project";
import UserData from "./User";

interface Organization {
  organizationId: number;
  organizationName: string;
  createdBy: number;
  user: UserData;
  projects: Project[];
}

export default Organization;
