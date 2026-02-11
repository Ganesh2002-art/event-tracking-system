import React, { useEffect, useState } from "react";
import API from "./services/api";
import EventTable from "./components/EventTable";

function App() {
  const [events, setEvents] = useState([]);

  const sendEvent = async (type, metadata) => {
    await API.post("/", { type, metadata });
  };

  const fetchEvents = async () => {
    const res = await API.get("/");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();

    const handleClick = (e) => {
      sendEvent("click", { x: e.clientX, y: e.clientY });
    };

    window.addEventListener("click", handleClick);

    const interval = setInterval(fetchEvents, 3000);

    return () => {
      window.removeEventListener("click", handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Event Tracking System</h1>
      <EventTable events={events} />
    </div>
  );
}

export default App;
