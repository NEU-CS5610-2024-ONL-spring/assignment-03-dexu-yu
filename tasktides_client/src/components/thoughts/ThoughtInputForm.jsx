import React from 'react';
import PropTypes from 'prop-types';

const ThoughtInputForm = ({ onAdd }) => {
  return (
    <div className="container mt-4">
      <form onSubmit={onAdd} autoComplete="off">
        <div className="mb-3">
          <textarea
            className="form-control form-control-lg"
            id="content"
            name="content"
            rows="3"
            placeholder="What's on Your mind?"
            maxLength="240"
            required
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="pub"
              name="pub"
            />
            <label className="form-check-label" htmlFor="pub">
              Public
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

ThoughtInputForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ThoughtInputForm;
