import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import IndexPage from "./pages/IndexPage.jsx";
import ChecklistsPage from "./pages/ChecklistsPage.jsx";
import ChecklistsItemPage from "./pages/ChecklistsItemPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<IndexPage />}
        />
        <Route
          path="checklists"
          element={<ChecklistsPage />}
        />
        <Route
          path="checklists/:checklistsItemId" 
          element={<ChecklistsItemPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
