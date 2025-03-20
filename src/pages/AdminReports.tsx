import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AdminReports = () => {
  const [totalTasks, setTotalTasks] = useState<number | null>(null);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [tasksRes, usersRes] = await Promise.all([
          fetch("/api/reports/total-tasks", { credentials: "include" }),
          fetch("/api/reports/top-users", { credentials: "include" }),
        ]);

        if (!tasksRes.ok || !usersRes.ok) throw new Error("Failed to fetch reports");

        const tasksData = await tasksRes.json();
        const usersData = await usersRes.json();

        setTotalTasks(tasksData.totalTasks);
        setTopUsers(usersData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Admin Reports</h1>

        {/* Total Tasks Report */}
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold">Total Tasks Created</h2>
          <p className="text-gray-700 text-lg">{totalTasks !== null ? totalTasks : "N/A"}</p>
        </div>

        {/* Top 3 Most Productive Users */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-3">Top 3 Productive Users</h2>
          <ul className="space-y-2">
            {topUsers.length > 0 ? (
              topUsers.map((user) => (
                <li key={user.userId} className="bg-gray-100 p-3 rounded">
                  <p className="text-lg font-semibold">{user.name} ({user.email})</p>
                  <p className="text-gray-600">Tasks Completed: {user.taskCount}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No data available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
