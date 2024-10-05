import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

export default function AddEvent() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Form state
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "", // New location field
    price: ""
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime || !formData.endTime) newErrors.time = "Start and end times are required";
    if (!formData.location) newErrors.location = "Location is required"; // New validation rule for location
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const eventData = {
        ...formData,
        time: `${formData.startTime} to ${formData.endTime}`, // Combine start and end time
      };

      try {
        await axios.post("http://localhost:3000/eventsData", eventData);
        alert("Event added successfully!");
        // Navigate to the home page after submission
        navigate("/"); // Replace with your home route
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg mt-10 rounded-lg mb-16">
      <h1 className="text-2xl font-bold mb-6">Add Event</h1>

      <form onSubmit={handleSubmit}>
        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Enter image URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Event title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Event Type */}
        <div className="mb-4">
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select event type</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
          </select>
          {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Time (Start and End) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Time</label>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="startTime" className="block text-xs font-medium text-gray-600">Start Time</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-xs font-medium text-gray-600">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter event location"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (optional)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 15"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
}
