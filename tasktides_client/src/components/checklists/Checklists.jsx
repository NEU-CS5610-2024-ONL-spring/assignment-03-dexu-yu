import React from "react";
import PropTypes from "prop-types";

const Checklists = ({ checklists, onClickList, onAddList }) => {
  return (
    <>
      <ul>
        <li onClick={() => onClickList(-1)}>All Events</li>
        {checklists.map(list => (
          <li key={list.id} onClick={() => onClickList(list.id)}>{list.title}</li>
        ))}
      </ul>
      <button onClick={onAddList}>+</button>
    </>
  );
};

Checklists.propTypes = {
  checklists: PropTypes.array.isRequired,
  onClickList: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired,
};

export default Checklists;
