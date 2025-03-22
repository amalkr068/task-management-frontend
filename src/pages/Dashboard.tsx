import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import {  DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("import.meta.env.VITE_REACT_APP_BACKEND_BASEURL/tasks", { credentials: "include" });

        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskOrder = async (updatedTasks: any[]) => {
    try {
      await fetch("/api/tasks/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reorderedTasks: updatedTasks }),
      });
    } catch (error) {
      console.error("Failed to update task order:", error);
    }
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTasks(updatedTasks);

    updateTaskOrder(updatedTasks);
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updatedTask = await response.json();
      setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

          <form onSubmit={handleCreateTask} className="mb-6 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl mb-4">Add Task</h2>
            <input
              className="border p-2 w-full mb-2"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="border p-2 w-full mb-4"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
              Add Task
            </button>
          </form>

          <h2 className="text-xl font-bold mb-2">Your Tasks</h2>
          <div className="space-y-3">
            {tasks?.map((task, index) => (
              <TaskItem
                key={task._id}
                task={task}
                index={index}
                moveTask={moveTask}
                handleStatusChange={handleStatusChange}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
