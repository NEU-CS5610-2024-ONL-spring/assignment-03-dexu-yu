import React from "react";
import PropTypes from "prop-types";

const Checklists = ({ currentListId, checklists, onClickList, onAddList, onDeleteList }) => {
  return (
    <>
      <ul className="list-group mt-2">
        <li
          key={-1}
          className={`list-group-item ${currentListId === -1 ? "active" : ""}`}
          onClick={() => onClickList(-1)}
        >
          All Events
        </li>
        {checklists.map(list => (
          <li
            className={`
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              ${currentListId === list.id ? "active" : ""}
            `}
            key={list.id}
            onClick={(e) => {
              e.stopPropagation();
              onClickList(list.id);
            }}
          >
            {list.title}
            {list.id !== -1 && (
              <button 
                type="button" 
                className="btn-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteList(list.id);
                }}
              />
            )}
          </li>
        ))}
      </ul>
      <div className="d-grid gap-2 d-md-flex justify-content-center justify-content-md-end my-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addListModal"
        >
          + Add List
        </button>
      </div>
      <div
        className="modal fade"
        id="addListModal"
        aria-labelledby="addListModalLabel"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addListModalLable">Add New List</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <form onSubmit={onAddList}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="newListName" className="form-label">List Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="list-title"
                    name="title"
                    autoComplete="off"
                    maxLength="50"
                    required
                  />
                </div>
                <div className="form-text" id="basic-addon4">You CANNOT change the list name after creating.</div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Checklists.propTypes = {
  checklists: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onClickList: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired,
  onDeleteList: PropTypes.func.isRequired,
};

export default Checklists;
