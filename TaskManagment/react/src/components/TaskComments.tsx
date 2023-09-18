import React, { useEffect, useState } from 'react';
import TaskComment from './TaskComment';

interface TaskComment {
  commentId: number;
  taskId: number;
  commentText: string;
  commentedByUserID: number;
  commentDate: string;
}

interface Props {
  taskId: number;
}

const TaskComments: React.FC<Props> = ({ taskId }) => {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the specified task from your API
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://localhost:7261/api/TaskComments/GetCommentsForTask/${taskId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error('Error fetching comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [taskId]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7261/api/TaskComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId,
          commentText: newComment
        }),
      });

      if (response.ok) {
        // Clear the input field and update the list of comments
        setNewComment('');
        // You can also fetch the updated list of comments here if needed
      } else {
        console.error('Error adding comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='comments'>
      <h2 className='comments__title'>Task Comments</h2>
      {comments ? 
      <ul className='comments__list'>
        {comments.map((comment) => (
         <TaskComment key={comment.commentId} comment={comment}/>
        ))}
      </ul>
      : <p>No comments</p>
      }
       <form onSubmit={handleSubmit} className='comments__form'>
        <textarea className='comments__textarea' value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder='Add a new comment'/>
        <button type='submit' disabled={!newComment} className='comments__btn'>Add comment</button>
      </form>
    </div>
  );
};

export default TaskComments;
