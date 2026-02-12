import React, { useEffect, useState } from "react";
import API from "./services/api";
import EventTable from "./components/EventTable";

function App() {
  const [events, setEvents] = useState([]);

  const sendEvent = async (type, metadata) => {
    try {
      await API.post("/", { type, metadata });
    } catch (error) {
      console.error("Error sending event:", error.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get("/");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Click Event
    const handleClick = (e) => {
      sendEvent("click", { x: e.clientX, y: e.clientY });
    };

    // Mouse Move (THROTTLED)
    let lastMove = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMove > 500) { // throttle every 500ms
        sendEvent("mousemove", { x: e.clientX, y: e.clientY });
        lastMove = now;
      }
    };

    // Scroll (DEBOUNCED)
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sendEvent("scroll", {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        });
      }, 300);
    };

    // Key Press
    const handleKeyDown = (e) => {
      sendEvent("keydown", { key: e.key });
    };

    // Page Load
    sendEvent("page_load", { url: window.location.href });

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(fetchEvents, 3000);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
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
