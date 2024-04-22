import React, { useEffect, useState } from "react";

import BaseBody from "../templates/BaseBody.jsx";

// import sampleChecklists from "../models/sampleChecklists.js";
// import sampleChecklistItems from "../models/sampleChecklistItems.js";

import Checklists from "../components/checklists/Checklists.jsx";
import ChecklistItems from "../components/checklists/ChecklistItems.jsx";
import ChecklistItemInputForm from "../components/checklists/ChecklistItemInputForm.jsx";

const ChecklistsPage = () => {

  const [currentListId, setCurrentListId] = useState(-1);
  const [checklists, setChecklists] = useState([]);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const getChecklistsFromApi = async () => {
      const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/checklists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      setChecklists(res);
    };

    const getItemsFromApi = async () => {
      const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clItems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      setItems(res);
    };

    getChecklistsFromApi();
    getItemsFromApi();

    setCurrentListId(-1);
    setDisplayedItems(items);
  }, []);
  
  useEffect(() => {
    if (currentListId === -1) {
      setDisplayedItems(items);
    } else {
      setDisplayedItems(items.filter(item => item.checklistId === currentListId));
    }
  }, [currentListId, items]);

  const onClickList = (id) => {
    setCurrentListId(id);
  };

  const onAddList = (listName) => {
    const newList = {
      id: checklists.length + 1,
      title: listName,
      userId: 101,
    };
    setChecklists([...checklists, newList]);
    setCurrentListId(newList.id);
  };

  const onDeleteList = (id) => {
    if (!confirm("Are you sure you want to delete this list?")) {
      return;
    }
    console.log(id);
  }

  const onAddItem = async (e) => {
    e.preventDefault();
    const checklistId = +e.target.list.value;
    if (checklistId === -1) {
      alert('Please select a checklist!');
      return;
    }

    const title = e.target.title.value;
    const due = e.target.due.value;
    const important = e.target.important.value === "on" ? true : false;
    const completed = e.target.completed.value === "on" ? true : false;

    const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clitem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checklistId,
        title,
        due,
        content: "",
        important,
        completed,
      }),
    });
    if (data.ok) {
      const newItem = await data.json();
      setItems([...items, newItem]);
      setCurrentListId(checklistId);
      e.target.reset();
    }
  };

  const onDeleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }
    const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  const onDetail = (id) => {
    console.log(id);
  }


  return (
    <BaseBody>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Checklists
              currentListId={currentListId}
              checklists={checklists}
              onClickList={onClickList}
              onAddList={onAddList}
              onDeleteList={onDeleteList}
            />
          </div>

          <div className="col-md-9">
            <ChecklistItems
              items={displayedItems}
              onDelete={onDeleteItem}
              onDetail={onDetail}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary position-fixed bottom-0 end-0 m-3"
        data-bs-toggle="modal"
        data-bs-target="#addEventModal"
        style={{ zIndex: 1030 }}
      >
        +
      </button>
      <ChecklistItemInputForm
        checklists={checklists}
        currentListId={currentListId}
        onAddItem={onAddItem}
      />
    </BaseBody>
  );
};

export default ChecklistsPage;
