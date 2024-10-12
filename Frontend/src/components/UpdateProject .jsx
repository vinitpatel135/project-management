import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const token = localStorage.getItem("token");
  const location = useLocation(); // Get the project details passed via navigate
  const navigate = useNavigate();

  const { project } = location.state; // Get project from location state
  const {
    _id,
    title: initialTitle,
    description: initialDescription,
    deadline: initialDeadline,
    status: initialStatus,
    payment: initialPayment,
  } = project;

  // State to manage form data
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [status, setStatus] = useState(initialStatus);
  const [payment, setPayment] = useState(initialPayment);

  // Function to handle payment update
  const makePayment = async (id) => {
    try {
      const response = await axios.patch(
        `https://project-management-4y6b.onrender.com/api/project/${id}/payment`, // Adjust the endpoint as needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayment("paid"); // Update payment status
      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.log(error);
      toast.warn(error.response?.data?.message || "Payment failed"); // Show error message
    }
  };

  // Handle form submission for updating project
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update project object with new values
    const updatedProject = {
      title,
      description,
      deadline,
      status,
      payment,
    };

    try {
      const response = await axios.patch(
        `https://project-management-4y6b.onrender.com/api/project/${_id}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message); // Show success message
      navigate("/home"); // Redirect to the home page after updating
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed"); // Show error message
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white shadow-md rounded-lg max-w-lg">
    <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
      Update Project
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>
  
      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows="5"
          required
        />
      </div>
  
      {/* Deadline Field */}
      <div>
        <label htmlFor="deadline" className="block text-lg font-medium text-gray-700 mb-2">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline.split("T")[0]}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>
  
      {/* Status Select */}
      <div>
        <label htmlFor="status" className="block text-lg font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
  
      {/* Payment Select */}
      <div>
        <label htmlFor="payment" className="block text-lg font-medium text-gray-700 mb-2">
          Payment
        </label>
        <select
          id="payment"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        >
          <option value="not paid">Not Paid</option>
          <option value="paid">Paid</option>
        </select>
      </div>
  
      {/* Make Payment Button */}
      {payment === "not paid" && (
        <button
          type="button"
          onClick={() => makePayment(_id)}
          className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Make Payment
        </button>
      )}
  
      {/* Update Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Update Project
      </button>
    </form>
  </div>
  
  );
};

export default UpdateProject;
