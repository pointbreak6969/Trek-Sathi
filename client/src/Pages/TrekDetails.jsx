import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';

const TrekDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const exampleJeepNumbers = ['Jeep 1: 1234', 'Jeep 2: 5678'];
  const exampleHotels = [
    { name: 'Hotel Everest', number: '123-456-7890' },
    { name: 'Hotel Annapurna', number: '098-765-4321' },
  ];

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleAddReview = (review) => {
    setReviews([...reviews, review]);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Trek Details</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Jeep Numbers</h2>
        <ul className="list-disc pl-5">
          {exampleJeepNumbers.map((jeep, index) => (
            <li key={index} className="text-gray-700">{jeep}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Hotels</h2>
        <ul className="list-disc pl-5">
          {exampleHotels.map((hotel, index) => (
            <li key={index} className="text-gray-700">
              <strong>{hotel.name}:</strong> {hotel.number}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Reviews</h2>
        <ul className="list-disc pl-5">
          {reviews.map((review, index) => (
            <li key={index} className="text-gray-700">{review}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Add a review"
            className="border rounded px-2 py-1 mt-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddReview(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Comments</h2>
        <ul className="list-disc pl-5">
          {comments.map((comment, index) => (
            <li key={index} className="text-gray-700">{comment}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Add a comment"
            className="border rounded px-2 py-1 mt-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={handleChatToggle}
        >
          <FaComments size={24} />
        </button>
      </div>

      {/* Chat Pop-up */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-64 bg-white border rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Group Chat</h3>
          <div className="h-48 overflow-auto mb-2">
            {comments.map((comment, index) => (
              <div key={index} className="mb-1">
                <strong>User {index + 1}:</strong> {comment}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            className="border rounded px-2 py-1 w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TrekDetails;