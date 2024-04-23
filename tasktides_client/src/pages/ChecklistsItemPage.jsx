import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthToken } from '../hooks/AuthTokenContext';

const ChecklistItemPage = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`${import.meta.env.VITE_TASKTIDES_API_URL}/clitem/${itemId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data) {
        setItem(data);
      }
    };

    if (itemId) {
      getItem();
    }
  }, [itemId, accessToken]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='container py-5'>
      <div className='card'>
        <div className='card-body'>
          {item ? (
            <>
              <h5 className='card-title'>{item.title}</h5>
              <p className='card-text'>{item.content}</p>
              <p className='card-text'>
                <small className='text-muted'>Due by: {item.due}</small>
              </p>
              <button className='btn btn-primary' onClick={goBack}>
                Go Back
              </button>
            </>
          ) : (
            <p>Loading item...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistItemPage;
