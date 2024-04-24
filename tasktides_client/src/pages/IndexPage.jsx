import React from "react";

import RandomThoughts from "../components/thoughts/RandomThoughts";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <>
      <div>
        {isAuthenticated ? (
          <button className="btn-primary" onClick={() => navigate("app/checklists")}>
            Enter App
          </button>
        ) : (
          <button className="btn-primary" onClick={loginWithRedirect}>
            Log In
          </button>
        )}
      </div>
      <RandomThoughts />
    </>
  );
};

export default IndexPage;
