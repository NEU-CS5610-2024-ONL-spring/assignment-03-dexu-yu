import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div className="home">
      <div>
        {isAuthenticated ? (
          <button className="btn-primary" onClick={() => navigate("/app")}>
            Enter App
          </button>
        ) : (
          <button className="btn-primary" onClick={loginWithRedirect}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
