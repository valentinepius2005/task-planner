import Task from "../../models/Task";  // Assuming Task model is in /models/Task.js
import connectDB from "../../utils/db";  // Assuming you have a db connection function

export default async function handler(req, res) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  await connectDB();

  if (req.method === "GET") {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const newTask = new Task(req.body);
    await newTask.save();
    return res.status(201).json(newTask);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
