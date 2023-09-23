import React from "react";
import User from "./User";

const TaskComment = ({ comment }) => {
  const { commentDate, commentedByUser, commentText } = comment;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Date(commentDate).toLocaleString(
    undefined,
    options
  );

  return (
    <li className="task-comment">
      <div className="task-comment__wrapper">
        <User user={commentedByUser} />
        <p className="task-comment__date">{formattedDate}</p>
      </div>
      <p className="task-comment__text">{commentText}</p>
    </li>
  );
};

export default TaskComment;
