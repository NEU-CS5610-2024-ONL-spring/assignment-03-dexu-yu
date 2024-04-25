import React, { useState, useEffect } from "react";

const RecentThoughts = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const getThoughts = async () => {
      const res = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/thoughts/recent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch thoughts");
        return;
      }

      const data = await res.json();
      console.log(data);
      setThoughts(data);
    };

    getThoughts();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container py-3">
      <h2 className="mb-3">What is happening?</h2>
      <ul className="list-group">
        {thoughts.map((thought, index) => (
          <li className="list-group-item" key={index}>
            <div className="d-flex align-items-center mb-2">
              <img
                src={thought.user.avatar}
                alt="User Avatar"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <div>
                <strong>{thought.user.name}</strong>
                <div className="text-muted small">
                  {formatDate(thought.created)}
                </div>
              </div>
            </div>
            <p className="mb-0">{thought.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentThoughts;
