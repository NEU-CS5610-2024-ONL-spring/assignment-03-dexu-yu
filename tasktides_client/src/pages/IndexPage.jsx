import React from "react";

import RecentThoughts from "../components/thoughts/RecentThoughts";
import Quote from "../components/Quote";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
          <div className="container py-4">
  <div className="row">
    <div className="col-lg-8 mx-auto">
      <div className="text-center mb-4">
        <h1>Welcome to TaskTides!</h1>
        <p>Here is a place to write down your thoughts and todos...</p>
        {isAuthenticated ? (
          <button className="btn btn-success" onClick={() => navigate("app/checklists")}>Enter App</button>
        ) : (
          <button className="btn btn-primary" onClick={loginWithRedirect}>Log In</button>
        )}
      </div>

      <div className="mb-4">
        <Quote />
      </div>

      <div className="mb-4">
        <RecentThoughts />
      </div>
    </div>
  </div>
</div>

  );
};

export default IndexPage;
