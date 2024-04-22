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
    <form onSubmit={onAddItem}>
      <div className="input-group">
        <label className="input-group-text"  htmlFor="item-list">Checklist</label>
        <select
          className="form-select"
          id="item-list"
          name="list"
          value={selectedListId}
          onChange={onChangeSelect}
        >
          <option key={-1} value={-1}></option>
          {checklists.map(list => (
            <option key={list.id} value={list.id}>{list.title}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label className="input-group-text" htmlFor="item-title">Title: </label>
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
      <div className="input-group">
        <label className="input-group-text" htmlFor="item-due">Due: </label>
        <input
          type="date"
          id="item-due"
          className="form-control"
          name="due"
          required
          autoComplete="off"
        />
      </div>
      <div className="input-group input-group-sm">
        <div className="input-group-text mt-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="item-important"
            name="important"
          />
        </div>
        <span className="input-group-text">Important</span>
      </div>
      <div className="input-group input-group-sm">
        <div className="input-group-text mt-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="item-completed"
            name="completed"
          />
        </div>
        <span className="input-group-text">Completed</span>
      </div>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
};

ChecklistItemInputForm.propTypes = {
  checklists: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default ChecklistItemInputForm;
