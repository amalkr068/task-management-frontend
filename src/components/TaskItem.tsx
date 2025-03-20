import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface TaskProps {
  task: any;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  handleStatusChange: (taskId: string, status: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, index, moveTask, handleStatusChange, handleDeleteTask }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`p-4 bg-gray-100 rounded shadow-md ${isDragging ? "opacity-50" : ""}`}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      {/* Status Update Dropdown */}
      <select
        className="border p-2 w-full mt-2"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Update Status Button */}
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        onClick={() => handleStatusChange(task._id, selectedStatus)}
      >
        Update Status
      </button>

      {/* Delete Button */}
      <button
        className="bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2"
        onClick={() => handleDeleteTask(task._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
