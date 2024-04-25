import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("ErrorPage", () => {
  test("renders ErrorPage and navigates on button click", () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("The page you are looking for does NOT exist.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Go Back"));
    expect(screen.getByText("Go Back")).toHaveProperty("href", "http://localhost/");
  });
});

