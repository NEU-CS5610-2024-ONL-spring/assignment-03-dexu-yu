import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ThoughtsPage from "../pages/ThoughtsPage";
import { useAuthToken } from "../hooks/AuthTokenContext";

jest.mock("../hooks/AuthTokenContext");

describe("Thoughts Tests", () => {
  beforeEach(() => {
    useAuthToken.mockReturnValue({ accessToken: "fake-token" });
    global.fetch = jest.fn((url, options) => {
      if (
        url === `${process.env.VITE_TASKTIDES_API_URL}/thoughts` &&
        options.method !== "POST"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {id: 4, pub: true, created: "2024-04-24T07:03:29.529Z", content: "My ideas.", userId: 1},
              {id: 5, pub: true, created: "2024-04-24T07:03:39.763Z", content: "My public ideas.", userId: 1},
            ]),
        });
      }

      if (
        url === `${process.env.VITE_TASKTIDES_API_URL}/thought` &&
        options.method === "POST"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              {id: 6, pub: false, created: "2024-04-24T07:16:02.306Z", content: "Anything.", userId: 1}
            ),
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders and interacts correctly", async () => {
    render(<ThoughtsPage />);

    await waitFor(() => {
      expect(screen.getByText("My ideas.")).toBeInTheDocument();
    });
    expect(screen.getByText("My public ideas.")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("form"), {
      target: { content: { value: "Anything." } },
    });
    fireEvent.click(screen.getByText("Post"));

    await waitFor(() => {
      expect(screen.getByText("Anything.")).toBeInTheDocument();
    });
  });
});
