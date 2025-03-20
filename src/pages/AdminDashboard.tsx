import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks/all", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/tasks/users", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ assignedTo: userId }),
      });

      if (!response.ok) throw new Error("Failed to assign task");

      const updatedTask = await response.json();
      setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <h2 className="text-xl font-bold mb-2">All Tasks</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="p-4 bg-gray-100 rounded shadow-md">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">Assigned To: {task.assignedTo || "Unassigned"}</p>

              {/* Assign Task Dropdown */}
              <select
                className="border p-2 w-full mt-2"
                value={assignments[task._id] || ""}
                onChange={(e) => setAssignments({ ...assignments, [task._id]: e.target.value })}
              >
                <option value="">Assign to user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => handleAssignTask(task._id, assignments[task._id])}
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
