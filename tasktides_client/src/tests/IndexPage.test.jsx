import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IndexPage from './../pages/IndexPage';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn().mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
  }),
}));

jest.mock('../components/RecentThoughts', () => () => <div>RecentThoughts Component</div>);
jest.mock('../components/Quote', () => () => <div>Quote Component</div>);

describe('IndexPage', () => {
  it('renders the welcome message and login button when not authenticated', () => {
    render(<IndexPage />);
    
    expect(screen.getByText(/welcome to tasktides!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('renders the enter app button when authenticated', () => {
    require('@auth0/auth0-react').useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    });
    
    render(<IndexPage />);
    
    expect(screen.getByRole('button', { name: /enter app/i })).toBeInTheDocument();
  });

  it('renders the Quote and RecentThoughts components', () => {
    render(<IndexPage />);
    
    expect(screen.getByText('Quote Component')).toBeInTheDocument();
    expect(screen.getByText('RecentThoughts Component')).toBeInTheDocument();
  });
});
