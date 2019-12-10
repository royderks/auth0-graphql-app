import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      date
    }
  }
`;

function Events() {
  const { loading, data, error } = useQuery(GET_EVENTS);

  if (loading) return "Loading...";
  if (error) return "Something went wrong...";

  return (
    <ul style={{ listStyle: "none", width: "100%", padding: "0" }}>
      {data.events.map(({ id, title, date }) => (
        <li
          key={id}
          style={{
            backgroundColor: "lightGrey",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <h2>{title}</h2>
          <span style={{ fontStyle: "italic" }}>{date}</span>
        </li>
      ))}
    </ul>
  );
}

export default Events;
