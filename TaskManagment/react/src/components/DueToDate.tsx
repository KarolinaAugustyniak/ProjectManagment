import Calendar from "../assets/img/calendar.svg";

interface DueToDateProps {
  date?: string;
}

export default function DueToDate({ date }: DueToDateProps) {
  if (date) {
    const dueDate = new Date(date);

    const formattedDate = dueDate.toLocaleDateString();

    return (
      <div className="due-to-date">
        <img src={Calendar} alt="Calendar Icon" />
        <p>Due to {formattedDate}</p>
      </div>
    );
  } else {
    return (
      <div className="due-to-date">
        <img src={Calendar} alt="Calendar Icon" />
        <p>Deadline not set</p>
      </div>
    );
  }
}
