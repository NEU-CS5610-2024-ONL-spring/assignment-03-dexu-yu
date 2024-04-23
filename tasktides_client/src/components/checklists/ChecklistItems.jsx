import React from "react";
import PropTypes from "prop-types";

const ChecklistItems = ({ items, onDetail, onDelete, onUpdate }) => {
  const onFinish = (id) => {
    const item = items.find((item) => item.id === id);
    onUpdate(id, { ...item, completed: !item.completed });
  };

  const onImportant = (id) => {
    const item = items.find((item) => item.id === id);
    onUpdate(id, { ...item, important: !item.important });
  }

  return (
  <>
    {items.map((item) => (
      <div key={item.id} className={`card mt-2 ${item.important ? 'border-start border-warning border-4' : ''}`}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>{item.due}</span>
          <button type="button" className="btn-close" aria-label="Delete" onClick={() => onDelete(item.id)}></button>
        </div>
        <div className="card-body">
          <button
            type="button"
            className={`btn btn-link p-0 ${
              item.completed ? 'text-decoration-line-through' : ''
            } ${item.important ? 'text-warning fw-bold' : ''}`}
            style={{ 
              fontSize: '1.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => onDetail(item.id)}
          >
            {item.title}
          </button>
          <div className="d-flex justify-content-end align-items-center">
            <div className="form-check form-switch me-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`importantSwitch${item.id}`}
                checked={item.important}
                onChange={() => onImportant(item.id)}
                style={{
                  backgroundColor: item.important ? '#ffc107' : '',
                  borderColor: item.important ? '#ffc107' : '#ced4da',
                  boxShadow: item.important ? '0 0 0 0.2rem rgba(255, 193, 7, 0.5)' : 'none'
                }}
              />
              <label className="form-check-label" htmlFor={`importantSwitch${item.id}`}></label>
            </div>
            <button
              onClick={() => onFinish(item.id)}
              className={`btn ${item.completed ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            >
              {item.completed ? 'Undo' : 'Finish'}
            </button>
          </div>

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
  onUpdate: PropTypes.func.isRequired,
};

export default ChecklistItems;
