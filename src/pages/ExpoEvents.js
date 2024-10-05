import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ExpoEvents() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(
        `http://localhost:3000/eventsData/${eventId}`
      );
      const data = await response.json();
      setEventData(data);
    };

    fetchEvent();
  }, [eventId]);

  if (!eventData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Event: {eventData.title}</h1>
    </div>
  );
}
