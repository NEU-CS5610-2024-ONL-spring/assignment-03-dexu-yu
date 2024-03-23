import React, { useEffect, useState } from "react";

import BaseBody from "../templates/BaseBody.jsx";

import sampleChecklists from "../models/sampleChecklists.js";
import sampleChecklistItems from "../models/sampleChecklistItems.js";

import Checklists from "../components/checklists/Checklists.jsx";
import ChecklistItems from "../components/checklists/ChecklistItems.jsx";
import ChecklistItemInputForm from "../components/checklists/ChecklistItemInputForm.jsx";

const ChecklistsPage = () => {

  const [currentListId, setCurrentListId] = useState(-1);
  const [checklists, setChecklists] = useState([]);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const getDataFromApi = async () => {
      setCurrentListId(-1);
      setChecklists(sampleChecklists);
      const allItems = await sampleChecklistItems;
      setItems(allItems);
      setDisplayedItems(allItems);
    };
    getDataFromApi();
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

  const onAddList = () => {
    const newList = {
      id: checklists.length + 1,
      title: "Untitled",
      userId: 101,
    };
    setChecklists([...checklists, newList]);
    setCurrentListId(newList.id);
  };

  const onAddItem = (e) => {
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
    const newItem = {
      id: Date.now(),
      checklistId,
      title,
      due,
      content: "",
      important,
      completed,
    };
    console.log(newItem);
    e.target.reset();
    setItems([...items, newItem]);
    setCurrentListId(checklistId);
  };

  const onDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  }

  const onDetail = (id) => {
    console.log(id);
  }

  return (
    <BaseBody>
      <h1>ChecklistsPage</h1>
      <Checklists checklists={checklists} onClickList={onClickList} onAddList={onAddList} />
      <ChecklistItemInputForm checklists={checklists} currentListId={currentListId} onAddItem={onAddItem} />
      <ChecklistItems items={displayedItems} onDelete={onDelete} onDetail={onDetail} />
    </BaseBody>
  );
};

export default ChecklistsPage;
