import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import IndexPage from "../pages/IndexPage";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Index Page Without Login Tests", () => {
  const mockLoginWithRedirect = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    });
    useNavigate.mockReturnValue(mockNavigate);
    global.fetch = jest.fn((url, options) => {
      if (
        url === `${process.env.VITE_TASKTIDES_API_URL}/thoughts/recent`
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                content: "I've finished my assignment...",
                created: "2024-04-24T06:03:07.828Z",
                completed: false,
                id: 1,
                pub: true, 
                user: {
                  avatar: "https://i.ibb.co/vVrZMg6/40680511.png",
                  name: "John Doe",
                },
                userId: 2,
              },
            ]),
        });
      }

      if (
        url === "https://api.quotable.io/random"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              author : "Publilius Syrus",
              content : "While we stop to think, we often miss our opportunity."
            }),
        });
      }
    });
  });

  test("Title renders correctly", () => {
    render(<IndexPage />);
    expect(screen.getByText("Welcome to TaskTides!")).toBeInTheDocument();
  });

  test("displays Login button when not authenticated", () => {
    render(<IndexPage />);
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  test("Quote renders correctly", async () => {
    render(<IndexPage />);
    await waitFor(() => {
      expect(screen.getByText("While we stop to think, we often miss our opportunity.")).toBeInTheDocument();
    });
  });

  test("Recent thoughts renders correctly", async () => {
    render(<IndexPage />);
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("Render Enter App button", () => {
    useAuth0.mockReturnValueOnce({
      isAuthenticated: true,
      loginWithRedirect: mockLoginWithRedirect,
    });
    render(<IndexPage />);
    expect(screen.getByText("Enter App")).toBeInTheDocument();
  });

  test("Enter App button triggers navigation", () => {
    useAuth0.mockReturnValueOnce({
      isAuthenticated: true,
      loginWithRedirect: mockLoginWithRedirect,
    });
    render(<IndexPage />);
    fireEvent.click(screen.getByText("Enter App"));
    expect(mockNavigate).toHaveBeenCalledWith("app/checklists");
  });
});
