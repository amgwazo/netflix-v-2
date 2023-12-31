// EditMovie.js
import React from "react";

const EditMovie = ({ movie, onClose }) => {
  // Your EditMovie component logic goes here

  return (
    <div>
      {/* Display movie data for editing */}
      <h3>Edit Movie</h3>
      <p>Title: {movie.title}</p>
      {/* Add other fields as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditMovie;
