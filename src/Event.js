import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useAuth0 } from './react-auth0-spa';
import Form from './Form';

const GET_EVENT = gql`
  query getEvent($id: Int!) {
    event(id: $id) {
      id
      title
      date
      description
      attendants {
        id
        name
      }
      canEdit
    }
  }
`;

const EDIT_EVENT = gql`
  mutation editEvent($id: Int!, $title: String!, $description: String!) {
    editEvent(id: $id, title: $title, description: $description) {
      title
      description
    }
  }
`;

function Event() {
  const { id } = useParams();
  const { isAuthenticated, getTokenSilently } = useAuth0();

  const [bearerToken, setBearerToken] = React.useState('');
  React.useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : '';

      setBearerToken(`Bearer ${token}`);
    };
    getToken();
  }, [getTokenSilently, isAuthenticated]);

  const { loading, data, error, refetch } = useQuery(GET_EVENT, {
    variables: { id: parseInt(id), bearerToken },
    context: {
      headers: {
        authorization: bearerToken,
      },
    },
  });

  const [editEvent] = useMutation(EDIT_EVENT, {
    context: {
      headers: {
        authorization: bearerToken,
      },
    },
  });

  if (loading) return 'Loading...';
  if (error) return 'Something went wrong...';

  const { title, date, description, attendants, canEdit } =
    (data && data.event) || {};

  return (
    <>
      <div
        style={{
          backgroundColor: 'lightGrey',
          margin: '15px 0px',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <h2>{title}</h2>
        <em>{date}</em>

        <p>{description}</p>

        {attendants && (
          <p>
            <strong>Attendants:</strong>

            <ul>
              {attendants.map(attendant => (
                <li key={attendant.id}>{attendant.name}</li>
              ))}
            </ul>
          </p>
        )}
      </div>
      {canEdit && (
        <Form
          id={id}
          onSubmit={editEvent}
          refetch={refetch}
          title={title}
          description={description}
        />
      )}
    </>
  );
}

export default Event;
