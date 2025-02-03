import axios from "axios";

const TaskList = ({ tasks, setTasks }) => {
  const deleteTask = (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    axios
      .delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Reminder: {new Date(task.reminder).toLocaleString()}</p>
              <p>Priority: {task.priority}</p>
              <p>Recurring: {task.recurring}</p>
              <p>Notes: {task.notes}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
