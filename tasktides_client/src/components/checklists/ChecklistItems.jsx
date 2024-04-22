import React from "react";
import PropTypes from "prop-types";

const ChecklistItems = ({ items, onDetail, onDelete }) => {
  console.log(items);
  return (
    <>
      {items.map(item => (
        <div key={item.id} className="card">
          <div className="card-header">
            {item.due}
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <button onClick={() => onDetail(item.id)} className="btn btn-primary">Detail</button>
            <button onClick={() => onDelete(item.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </>
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
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChecklistItems;
