import { useState } from "react";
import axios from "axios";

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [recurring, setRecurring] = useState("None");

  const addTask = () => {
    const newTask = { title, description, reminder, notes, priority, recurring };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    axios
      .post("http://localhost:5000/tasks", newTask, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTitle("");
        setDescription("");
        setReminder("");
        setNotes("");
        setPriority("Medium");
        setRecurring("None");
      })
      .catch((error) => {
        console.error("There was an error adding the task!", error);
      });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Reminder"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={recurring} onChange={(e) => setRecurring(e.target.value)}>
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
