import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";

const AuthTokenContext = React.createContext();

const requestedScopes = ["profile", "email"];

const AuthTokenProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_TASKTIDES_AUTH0_AUDIENCE,
            scope: requestedScopes.join(" "),
          },
          useRefreshTokens: true,
          cacheLocation: "localstorage"
        });
        setAccessToken(token);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const value = { accessToken };
  return (
    <AuthTokenContext.Provider value={value}>
      {children}
    </AuthTokenContext.Provider>
  );
};

const useAuthToken = () => useContext(AuthTokenContext);

AuthTokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuthToken, AuthTokenProvider };
