import React, { useState, useEffect } from 'react';

import LoadingPage from './LoadingPage';
import { useAuthToken } from "../hooks/AuthTokenContext";

import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
  const { user, isLoading, logout } = useAuth0();
  const { accessToken } = useAuthToken();

  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.picture || '');

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (data.ok) {
        const profile = await data.json();
        setName(profile.name);
        setAvatar(profile.avatar);
      }
    };
    getProfile();
  }, [user]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        avatar,
      }),
    });
    if (data.ok) {
      alert("Profile updated successfully");
      const profile = await data.json();
      setName(profile.name);
      setAvatar(profile.avatar);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img src={avatar} alt="profile" className="rounded-circle img-fluid" style={{ width: '100px', height: '100px' }} />
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" id="email" defaultValue={user.email} required disabled />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="avatar" className="form-label">Avatar URL</label>
              <input type="text" className="form-control" id="avatar" value={avatar} onChange={handleAvatarChange} required />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-2">Update</button>
              <button type="button" className="btn btn-danger" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
