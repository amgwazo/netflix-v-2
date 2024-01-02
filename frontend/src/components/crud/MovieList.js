import React, { useState } from "react";
import EditMovie from "./EditMovie";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import './MovieList.css';

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const Display = (props) => {
  const [editMovie, setEditMovie] = useState(null);
  const [createMovie, setCreateMovie] = useState(null);
   const [movieIdToDelete, setMovieIdToDelete] = useState("");

  const handleEdit = (movie) => {
    setEditMovie(movie);
  };

  const handleCreate = () => {
    const movie = {
      // initialize with default values or empty strings
      adult: false,
      backdrop_path: "/94hfGX8TSFJdgN0Upq3xnQVAoNW.jpg",
      genre_ids: [10770, 35, 10749],
      _id: 1027338,
      id: 1027338,
      original_language: "en",
      original_title: "We Wish You a Married Christmas",
      overview:
        "Becca and Robby are a married couple having a hard time connecting with each other as the holidays approach. Just before Christmas, they head to a cozy Vermont inn at the advice of their marriage coach so they can recharge. Their weekend away gets unexpectedly extended when a mishap puts their car out of commission and just may put them on the road to a very happily married Christmas.",
      popularity: 11.656,
      poster_path: "/cZjDTEpZ0SPER7NuuIIjPlGwEP8.jpg",
      release_date: "2022-10-22",
      title: "We Wish You a Married Christmas",
      video: false,
      vote_average: 5.5,
      vote_count: 14,
    };
    setCreateMovie(movie);
  };

  // const handleClose = () => {
  //   setEditMovie(null);
  //   props.setTitle = "";
  // };

  // Delete movie
  const handleDeleteMovie = async (movie) => {

    const queryParams = new URLSearchParams({
     id: movie.id
   });


   setMovieIdToDelete(movie.id);
   console.log('deleting movie');
    
    try {
      
      const response = await fetch(`${apiURL}/movies?${queryParams}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovieIdToDelete("");
        props.setItemsPerPage(Math.floor(Math.random() * 100) + 250); //random number between 250 and 350
        props.setTitle('');
        alert('Delete Operation Successful.');
        // Fetch updated list of movies
        // fetchMovies();
      } else {
        console.error("Error deleting movie:", response.statusText);
        alert(`Error deleting movie: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert(`Error deleting movie: ${error}`);
    }
  };


  const handleConfirmation = (movie) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete '${movie.title}' ?`
    );

    if (userConfirmed) {
      handleDeleteMovie(movie);
    } else {     
      console.log("Execution canceled by user");
      alert("Operation Cancelled by user.")
    }
  };

  const renderData = ({ movies }) => {
    if (movies) {
      return movies.map((item) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td>{item?.title}</td>
            <td>{item?.vote_count}</td>
            <td>{item?.popularity}</td>
            <td>
              {/* <button onClick={() => handleEdit(item)}>
                <faEdit />
              </button> */}
              <span>
                <BsFillTrashFill
                  className="edit-btn ms-2 cursor-pointer"
                  onClick={() => handleConfirmation(item)}
                />
                <BsFillPencilFill
                  className="edit-btn ms-2 cursor-pointer"
                  onClick={() => handleEdit(item)}
                />
              </span>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="container p-5 ">
      <div className="bg-dark p-3 rounded">
        {editMovie && (
          <div className="bg-white rounded p-3 mb-4">
            <EditMovie
              movie={editMovie}
              onClose={() => setEditMovie(null)}
              // onClose={handleClose}
              operation="editMovie"
              setTitle={props.setTitle}
              title={props.title}
            />
          </div>
        )}

        {createMovie && (
          <div className="bg-white rounded p-3 mb-4">
            <EditMovie
              movie={createMovie}
              onClose={() => setCreateMovie(null)}
              operation="addMovie"
              setTitle={props.setTitle}
              title={props.title}
            />
          </div>
        )}
        {!editMovie && !createMovie && (
          <div className="flex d-flex justify-content-between">
            <h3 className="text-secondary ">Movies</h3>
            <button
              className=" btn btn-sm  btn-danger form-buttons ps-3 pe-4 my-2 "
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        )}

        <div className="w-75 ">
          <input
            type="text"
            className="col-8 mb-4"
            value={props.title}
            onChange={(e) => props.setTitle(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        {/* <table
       className="table"
           style={{ maxHeight: "100px", overflowY: "scroll" , backgroundColor: 'white', borderRadius: '20px'}}
      > */}

        {/* <table className="table table-bordered table-striped text-white" > */}

        <Table responsive striped bordered hover size="sm">
          <thead className="thead">
            <tr>
              <th>Movie Id</th>
              <th>Title</th>
              <th>Vote Count</th>
              <th>Popularity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderData(props)}</tbody>
        </Table>
        {/* </table> */}
      </div>
    </div>
  );
};

export default Display;
