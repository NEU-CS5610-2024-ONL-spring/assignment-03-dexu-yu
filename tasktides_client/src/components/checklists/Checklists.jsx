import React from "react";
import PropTypes from "prop-types";

const Checklists = ({ currentListId, checklists, onClickList, onAddList }) => {
  return (
    <>
      <ul className="list-group">
        <li
          key={-1}
          className={currentListId === -1 ? "list-group-item active" : "list-group-item"}
          onClick={() => onClickList(-1)}
        >
          All Events
        </li>
        {checklists.map(list => (
          <li
            className={currentListId === list.id ? "list-group-item active" : "list-group-item"}
            key={list.id}
            onClick={() => onClickList(list.id)}
          >
            {list.title}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={onAddList}
      >
          +
      </button>
    </>
  );
};

Checklists.propTypes = {
  checklists: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onClickList: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired,
};

export default Checklists;
