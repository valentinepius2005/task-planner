import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [recurring, setRecurring] = useState("None");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks", { headers: { Authorization: localStorage.getItem("token") } })
      .then(response => setTasks(response.data));
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5000/tasks", { title, description, reminder, notes, priority, recurring }, { headers: { Authorization: localStorage.getItem("token") } })
      .then(response => setTasks([...tasks, response.data]));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`, { headers: { Authorization: localStorage.getItem("token") } })
      .then(() => setTasks(tasks.filter(task => task._id !== id)));
  };

  return (
    <div>
      <h1>Day Planner</h1>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input type="datetime-local" placeholder="Reminder" onChange={e => setReminder(e.target.value)} />
      <textarea placeholder="Notes" onChange={e => setNotes(e.target.value)}></textarea>
      <select onChange={e => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select onChange={e => setRecurring(e.target.value)}>
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}: {task.description} (Reminder: {task.reminder}) [Notes: {task.notes}] (Priority: {task.priority}) (Recurring: {task.recurring})
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
export async function getServerSideProps() {
  try {
    // Fetch tasks from the backend API
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${process.env.JWT_SECRET}` },
    });
    const initialTasks = response.data;

    // Return tasks as props to the page component
    return { props: { initialTasks } };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { props: { initialTasks: [] } };  // Return empty tasks in case of error
  }
}
