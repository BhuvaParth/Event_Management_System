import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export default function About() {
  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();

  const handleEdit = () => {
    toast.info("Navigating to edit event..."); 
    navigate(`/edit-event/${event.id}`, { state: event });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/eventsData/${event.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Event deleted successfully!"); 
          setTimeout(() => {
            navigate("/"); 
          }, 1000);
        } else {
          toast.error("Failed to delete the event."); 
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Error occurred while deleting the event."); 
      }
    }
  };

  if (!event) {
    return <div className="text-center text-red-500">No event data found.</div>;
  }

  return (
    <>
      <div className="w-full bg-white p-6">
      <ToastContainer /> 
        <div className="mb-4 flex justify-end gap-3">
          <button
            onClick={handleEdit}
            className="bg-blue-700 text-white font-medium py-[6px] px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-rose-600 text-white font-medium py-[6px] px-4 rounded-md shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            Delete
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <img
              src={event.imageUrl || "https://via.placeholder.com/1200x500"}
              alt={event.title || "Sample Image"}
              className="max-h-[500px] object-cover rounded-lg mb-4"
            />
          </div>
          <div className="flex flex-col justify-center w-3/4 mb-4">
            <h2 className="text-3xl font-bold mb-4">
              {event.title || "Page Title"}
            </h2>
            <div className="flex flex-col gap-10">
              <p className="text-xl text-gray-700">{event.description}</p>
              <p className="text-xl text-gray-700">
                <span className="text-lg font-bold">Date and Time : </span>
                <span>
                  {event.date} | {event.time}
                </span>
              </p>
              <p className="text-xl text-gray-700">
                <span className="text-lg font-bold">Location : </span>
                <span>{event.location}</span>
              </p>
              <p className="text-xl text-gray-700">
                <span className="text-lg font-bold">Event Type : </span>
                <span>{event.eventType}</span>
              </p>
              <p className="text-xl text-gray-700">
                <span className="text-lg font-bold">Price : </span>
                <span>${event.price || "Free"}</span>
              </p>
              {event.mapUrl && (
                <div className="mb-4 w-full">
                  <h2 className="text-lg font-bold">Map Preview</h2>
                  <iframe
                    src={event.mapUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Map Preview"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
