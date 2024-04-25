import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">Oops!</h1>
      <p className="mb-4">The page you are looking for does NOT exist.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
