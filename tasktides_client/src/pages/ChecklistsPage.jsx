import React, { useEffect, useState } from "react";

import BaseBody from "../templates/BaseBody.jsx";

import sampleChecklists from "../models/sampleChecklists.js";
import sampleChecklistItems from "../models/sampleChecklistItems.js";

import Checklists from "../components/checklists/Checklists.jsx";
import ChecklistItems from "../components/checklists/ChecklistItems.jsx";

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

  return (
    <BaseBody>
      <h1>ChecklistsPage</h1>
      <Checklists checklists={checklists} onClickList={onClickList} onAddList={onAddList} />
      <ChecklistItems items={displayedItems} />
    </BaseBody>
  );
};

export default ChecklistsPage;
