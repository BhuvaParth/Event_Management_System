import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards({ searchQuery = "" }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/eventsData");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.eventsData) {
          setEvents(data.eventsData);
        } else if (Array.isArray(data)) {
          setEvents(data);
        } else {
          throw new Error("Data format is not recognized");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return <div className="text-center">No events found.</div>;
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              to="/about"
              state={event}
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {event.title.length > 50
                    ? `${event.title.slice(0, 50)}...`
                    : event.title}
                </h2>
                <p className="text-gray-600 mb-1">{event.date}</p>
                <p className="text-gray-600 mb-1">{event.location}</p>
                <p className="text-gray-600 mb-1">{event.eventType}</p>
                <p className="font-semibold">${event.price ||  'Free'}</p>

              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">No events found for "{searchQuery}"</div>
        )}
      </div>
    </div>
  );
}
