import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const ProjectCard = ({ project, onDelete }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  // Destructure project properties
  const {
    _id,
    title,
    description,
    deadline,
    payment: initialPayment,
    status: initialStatus,
  } = project;

  // Format date to local date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date
  };

  // Delete project function
  const deleteProject = async (id) => {
    try {
      const response = await axios.delete(
        `https://project-management-gcai.onrender.com/api/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message); // Show success message
      onDelete(id); // Notify parent to remove project from the list
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed"); // Show error message
    }
  };

  // Navigate to update page
  const handleUpdate = () => {
    navigate(`/home/update-project/${_id}`, { state: { project } });
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 m-6 border border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="flex space-x-2">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
          initialStatus === "completed"
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {initialStatus}
      </span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
          initialPayment === "paid"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {initialPayment}
      </span>
    </div>
  </div>
  <p className="text-gray-600 mb-6">{description}</p>
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-500">Deadline: {formatDate(deadline)}</p>
    </div>
    <div className="flex items-center space-x-3">
      {/* Update Button */}
      <button
        className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition transform hover:scale-105"
        onClick={handleUpdate}
      >
        Update
      </button>

      {/* Delete Button */}
      <button
        className="px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition transform hover:scale-105"
        onClick={() => deleteProject(_id)}
      >
        Delete
      </button>
    </div>
  </div>
</div>

  );
};

export default ProjectCard;
