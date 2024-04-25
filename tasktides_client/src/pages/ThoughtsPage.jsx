import React, { useState, useEffect } from "react";

import MyThoughts from "../components/thoughts/MyThoughts";
import ThoughtInputForm from "../components/thoughts/ThoughtInputForm";

import { useAuthToken } from "../hooks/AuthTokenContext";

const ThoughtsPage = () => {
  const [thoughts, setThoughts] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    const getThoughtsFromApi = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/thoughts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setThoughts(data);
      } catch (err) {
        console.error(err);
      }
    };
    getThoughtsFromApi();
  }, [accessToken]);

  const onAdd = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const pub = e.target.pub.checked;
    console.log("CLICK BUTTON!!!!", content, pub);
    try {
      const res = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/thought`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content, pub }),
      });
      const data = await res.json();
      setThoughts((prev) => [data, ...prev]);
      e.target.reset();
    } catch (err) {
      alert("Failed to post thought.");
      console.error(err);
    }
  };

  const onUpdate = async (id, pub) => {
    console.log(id, pub);
    try {
      const res = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/thought/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ pub }),
      });
      const data = await res.json();
      setThoughts((prev) => prev.map((thought) => {
        if (thought.id === id) {
          return data;
        }
        return thought;
      }));
    } catch (err) {
      alert("Failed to update thought.");
      console.error(err);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this thought?")) {
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/thought/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setThoughts((prev) => prev.filter((thought) => thought.id !== id));
    } catch (err) {
      alert("Failed to delete thought.");
      console.error(err);
    }
  };

  return (
    <>
      <ThoughtInputForm onAdd={onAdd} />
      <MyThoughts thoughts={thoughts} onUpdate={onUpdate} onDelete={onDelete} />
    </>
  );
};

export default ThoughtsPage;
