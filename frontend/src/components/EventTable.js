import React from "react";

const EventTable = ({ events }) => {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Type</th>
          <th>Metadata</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{event.type}</td>
            <td>{JSON.stringify(event.metadata)}</td>
            <td>{new Date(event.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
