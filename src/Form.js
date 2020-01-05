import React from 'react';

const Form = ({ id, onSubmit, refetch, ...props }) => {
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);

  const handleOnSubmit = e => {
    e.preventDefault();

    onSubmit({ variables: { id: parseInt(id), title, description } });
    refetch();
  };

  return (
    <div
      style={{
        backgroundColor: 'lightGrey',
        margin: '15px 0px',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <h3>Edit event</h3>
      <form onSubmit={handleOnSubmit}>
        <p>
          <label for='title' style={{ marginRight: '10px' }}>
            Title:
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </p>

        <p>
          <label for='description' style={{ marginRight: '10px' }}>
            Description:
          </label>
          <input
            id='description'
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </p>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
