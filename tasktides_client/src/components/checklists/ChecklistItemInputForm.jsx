import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ChecklistItemInputForm = ({ currentListId, checklists, onAddItem }) => {

  const [selectedListId, setSelectedListId] = useState(currentListId);

  useEffect(() => {
    setSelectedListId(currentListId);
  }, [currentListId]);

  const onChangeSelect = (e) => {
    setSelectedListId(e.target.value);
  };

  return (
    <div className="modal fade" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addEventModalLabel">Add Event</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={onAddItem}>
              <div className="mb-3">
                <label htmlFor="item-list" className="form-label">Checklist</label>
                <select
                  className="form-select"
                  id="item-list"
                  name="list"
                  value={selectedListId}
                  onChange={onChangeSelect}
                  required
                >
                  <option value="">Select a list</option>
                  {checklists.map(list => (
                    <option key={list.id} value={list.id}>{list.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="item-title" className="form-label">Title</label>
                <input
                  className="form-control"
                  type="text"
                  id="item-title"
                  name="title"
                  autoComplete="off"
                  maxLength="50"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="item-due" className="form-label">Due</label>
                <input
                  className="form-control"
                  type="date"
                  id="item-due"
                  name="due"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="item-important"
                  name="important"
                />
                <label className="form-check-label" htmlFor="item-important">
                  Important
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="item-completed"
                  name="completed"
                />
                <label className="form-check-label" htmlFor="item-completed">
                  Completed
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ChecklistItemInputForm.propTypes = {
  checklists: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default ChecklistItemInputForm;
