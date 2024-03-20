import React from "react";
import PropTypes from "prop-types";

const ChecklistItems = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <div>{item.title}</div>
          <div>{item.due}</div>
          <div>{item.content}</div>
          <div>{item.important}</div>
          <div>{item.completed}</div>
        </li>
      ))}
    </ul>
  );
};

ChecklistItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

export default ChecklistItems;
