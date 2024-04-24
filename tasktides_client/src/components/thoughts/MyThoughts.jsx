import React from 'react';
import PropTypes from 'prop-types';

const MyThoughts = ({ thoughts, onUpdate, onDelete }) => {
  const onPublic = (id) => {
    const thought = thoughts.find((thought) => thought.id === id);
    onUpdate(id, !thought.pub);
  };

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {thoughts.map((thought, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check form-switch me-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`public-switch-${index}`}
                  checked={thought.pub}
                  onChange={() => onPublic(thought.id)}
                />
                <label className="form-check-label" htmlFor={`public-switch-${index}`}>Public</label>
              </div>
              <div className="flex-grow-1 ms-2">
                <h5 className="mb-1">{thought.content}</h5>
                <small className="text-muted">{new Date(thought.created).toLocaleString()}</small>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(thought.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

MyThoughts.propTypes = {
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      pub: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyThoughts;
