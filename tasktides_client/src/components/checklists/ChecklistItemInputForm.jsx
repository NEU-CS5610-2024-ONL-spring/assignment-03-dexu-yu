import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ChecklistItemInputForm = ({ checklists, currentListId, onAddItem }) => {

  const [selectedListId, setSelectedListId] = useState(currentListId);

  useEffect(() => {
    setSelectedListId(currentListId);
  }, [currentListId]);

  const onChangeSelect = (e) => {
    setSelectedListId(e.target.value);
  };

  return (
    <form onSubmit={onAddItem}>
      <label htmlFor="item-list">Checklist: </label>
      <select
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
      <label htmlFor="item-title">Title: </label>
      <input type="text" id="item-title" name="title" required autoComplete="off" />
      <label htmlFor="item-due">Due: </label>
      <input type="date" id="item-due" name="due" required autoComplete="off" />
      <label htmlFor="item-important">Important: </label>
      <input type="checkbox" id="item-important" name="important" />
      <label htmlFor="item-completed">Completed: </label>
      <input type="checkbox" id="item-completed" name="completed" />
      <input type="submit" value="Add" />
    </form>
  );
};

ChecklistItemInputForm.propTypes = {
  checklists: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default ChecklistItemInputForm;
