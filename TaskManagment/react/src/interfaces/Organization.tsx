import Project from "./Project";
import UserData from "./UserData";

interface Organization {
  organizationId: number;
  organizationName: string;
  createdBy: number;
  user: UserData;
  projects: Project[];
}

export default Organization;
