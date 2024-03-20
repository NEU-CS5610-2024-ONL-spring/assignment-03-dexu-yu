import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import IndexPage from "./pages/IndexPage.jsx";
import ChecklistsPage from "./pages/ChecklistsPage.jsx";
import TimeBlocksPage from "./pages/TimeBlocksPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/IndexPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/checklists" element={<ChecklistsPage />} />
        <Route path="/timeblocks" element={<TimeBlocksPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
