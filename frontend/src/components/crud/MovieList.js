import React, { useState } from "react";
import EditMovie from "./EditMovie";
import Table from "react-bootstrap/Table";

const Display = (props) => {

    const [editMovie, setEditMovie] = useState(null);

    
    const handleEdit = (movie) => {
      setEditMovie(movie);
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
              <button onClick={() => handleEdit(item)}>Edit</button>
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
          <div className="bg-white rounded p-5 mb-4">
            <EditMovie movie={editMovie} onClose={() => setEditMovie(null)} />
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
          <thead>
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
