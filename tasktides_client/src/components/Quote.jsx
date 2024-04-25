import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      console.log(data);
      setQuote(data);
    };
    getQuote();
  }, []);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p className="mb-2">{quote?.content}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{quote?.author}</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
