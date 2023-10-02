import User from "./User";
import UserData from "../interfaces/UserData";

interface CreationDataProps {
  date: string;
  createdByUser: UserData;
}

const CreationData = ({ date, createdByUser }: CreationDataProps) => {
  const creationDate = new Date(date);
  const formattedCreationDate = creationDate.toLocaleDateString();

  return (
    <div className="creation-data">
      Created by
      <User user={createdByUser} />
      on {formattedCreationDate}
    </div>
  );
};

export default CreationData;
