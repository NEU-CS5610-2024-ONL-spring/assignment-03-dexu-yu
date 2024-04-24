import React from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./hooks/AuthTokenContext";

import IndexPage from "./pages/IndexPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ThoughtsPage from "./pages/ThoughtsPage.jsx";
import ChecklistsPage from "./pages/ChecklistsPage.jsx";
import ChecklistsItemPage from "./pages/ChecklistsItemPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import VerifyUser from "./pages/VerifyUser";
import DebugPage from "./pages/DebugPage";

import BaseBody from "./templates/BaseBody";

const requestedScopes = ["profile", "email"];

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_TASKTIDES_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_TASKTIDES_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: import.meta.env.VITE_TASKTIDES_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/verify-user" element={<VerifyUser />} />  
            <Route
              path="app"
              element={
                <RequireAuth>
                  <BaseBody />
                </RequireAuth>
              }
            >
              <Route path="" element={<ChecklistsPage />} />
              <Route path="checklists" element={<ChecklistsPage />} />
              <Route path="thoughts" element={<ThoughtsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="clitem/:itemId" element={<ChecklistsItemPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
)

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
