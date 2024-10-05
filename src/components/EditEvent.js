import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const eventId = event?.id;

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
    mapUrl: "", 
  });

  useEffect(() => {
    if (event) {
      setFormData({
        imageUrl: event.imageUrl || "",
        title: event.title || "",
        description: event.description || "",
        eventType: event.eventType || "",
        date: event.date || "",
        startTime: event.time?.split(" - ")[0] || "",
        endTime: event.time?.split(" - ")[1] || "",
        location: event.location || "",
        price: event.price || "",
        mapUrl: event.mapUrl || "", 
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventId) {
      console.error("Event ID is missing");
      return; 
    }

    try {
      console.log("Form data being submitted:", formData);
      console.log("Event ID:", eventId);

      const response = await fetch(`http://localhost:3000/eventsData/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          time: `${formData.startTime} - ${formData.endTime}`, 
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails); 
        throw new Error("Failed to update event");
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg mt-10 rounded-lg mb-16">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-gray-700"
          >
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select event type</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Event Time
          </label>
          <div className="flex space-x-4">
            <div>
              <label
                htmlFor="startTime"
                className="block text-xs font-medium text-gray-600"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-xs font-medium text-gray-600"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mapUrl" className="block text-sm font-medium text-gray-700">
            Map URL
          </label>
          <input
            type="url"
            id="mapUrl"
            name="mapUrl"
            value={formData.mapUrl}
            onChange={handleChange} 
            placeholder="Enter map URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (optional)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 15"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
}
