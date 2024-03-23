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
      await setChecklists(sampleChecklists);
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
  }, [currentListId]);

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
    const listId = e.target.list.value;
    if (listId === -1) {
      alert('Please select a checklist!');
      return;
    }
    const title = e.target.title.value;
    const due = e.target.due.value;
    const important = e.target.important.value === "on" ? true : false;
    const completed = e.target.completed.value === "on" ? true : false;
    console.log(listId, title, due, important, completed);
    const newItem = {
      id: Date.now(),
      listId,
      title,
      due,
      content: "",
      important,
      completed,
    };
    console.log(newItem);
    e.target.reset();
  };

  return (
    <BaseBody>
      <h1>ChecklistsPage</h1>
      <Checklists checklists={checklists} onClickList={onClickList} onAddList={onAddList} />
      <ChecklistItemInputForm checklists={checklists} currentListId={currentListId} onAddItem={onAddItem} />
      <ChecklistItems items={displayedItems} />
    </BaseBody>
  );
};

export default ChecklistsPage;
