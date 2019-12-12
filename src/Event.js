import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useAuth0 } from "./react-auth0-spa";

const GET_EVENT = gql`
  query getEvent($id: Int!) {
    event(id: $id) {
      id
      title
      date
      attendants {
        id
        name
      }
    }
  }
`;

function Event() {
  const { id } = useParams();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const [bearerToken, setBearerToken] = React.useState("");
  React.useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getIdTokenClaims() : "";

      setBearerToken(`Bearer ${token.__raw}`);
    };
    getToken();
  }, [getIdTokenClaims, isAuthenticated]);

  const { loading, data, error } = useQuery(GET_EVENT, {
    variables: { id: parseInt(id), bearerToken },
    context: {
      headers: {
        authorization: bearerToken
      }
    }
  });

  if (loading) return "Loading...";
  if (error) return "Something went wrong...";

  return (
    <ul style={{ listStyle: "none", width: "100%", padding: "0" }}>
      <li
        style={{
          backgroundColor: "lightGrey",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        <h2>{data.event.title}</h2>
        <span style={{ fontStyle: "italic" }}>{data.event.date}</span>

        <ul>
          {data.event.attendants &&
            data.event.attendants.map(attendant => (
              <li key={attendant.id}>{attendant.name}</li>
            ))}
        </ul>
      </li>
    </ul>
  );
}

export default Event;
