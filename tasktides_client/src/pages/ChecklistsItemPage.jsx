import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthToken } from "../hooks/AuthTokenContext";

import markdownit from "markdown-it";

const ChecklistItemPage = () => {
  const [item, setItem] = useState(null);
  const [mdText, setMdText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  const { accessToken } = useAuthToken();
  const { itemId } = useParams();
  const navigate = useNavigate();

  const md = markdownit();

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clitem/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        setItem(data);
        setMdText(md.render(data.content));
        setEditedItem(data);
      }
    };

    if (itemId) {
      getItem();
    }
  }, [itemId, accessToken]);

  const onSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clitem/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editedItem),
      });
      const data = await res.json();
      if (data.id) {
        setItem(editedItem);
        setMdText(md.render(editedItem.content));
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  if (!item) {
    return <p>Loading item...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          {editMode ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  value={editedItem.title}
                  onChange={handleInputChange}
                  name="title"
                  className="form-control form-control-lg mb-3"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={editedItem.content}
                  onChange={handleInputChange}
                  name="content"
                  className="form-control"
                  rows="10"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  value={editedItem.due}
                  onChange={handleInputChange}
                  name="due"
                  className="form-control mb-3"
                  autoComplete="off"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button onClick={onSave} className="btn btn-primary me-2">Save</button>
                <button onClick={() => setEditMode(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-1">{item.title}</h1>
              <div className="markdown-body bg-light p-3 border rounded" dangerouslySetInnerHTML={{ __html: mdText }} />
              <p className="text-muted"><small>Due by: {item.due}</small></p>
              <div className="d-flex">
                <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>Edit</button>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistItemPage;
