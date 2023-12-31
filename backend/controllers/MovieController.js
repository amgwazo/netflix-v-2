const bodyParser = require("body-parser");
const Movie = require("../models/movieSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createMovie = async (req, res) => {
  try {
    const {
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    } = req.body;

    const newMovie = new Movie({
      _id: id.toString(),
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      res
        .status(400)
        .json({
          error: "Duplicate ID. Movie with the same ID already exists.",
        });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


const updateMovie = async (req, res) => {
  try {
    const { id } = req.query; 
    const updatedMovie = req.body;
    console.log(id);
    const result = await Movie.updateOne({ id: id }, { $set: updatedMovie });
    console.log(result);

    if (result.modifiedCount >= 1) {
      res.status(200).json({ message: "Movie updated successfully." });
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.query; 
    console.log(id);

    const result = await Movie.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Movie deleted successfully." });
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



//list all movies
const getMovies = async (req, res) => {
   try {
     const data = await Movie.find();
     res.json(data);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
  
};


//filtered movies

const filteredMovies = async (req, res) => {
 
  let token = req.headers["x-access-token"];
  if (!token)
    return res.status(201).send({ auth: false, token: "No Token Provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err)
      return res.status(201).send({ auth: false, token: "Invalid Token" });

    
      //DO FILTER

       let { title, genre_id, lowrating, highrating, sort, page , itemsPerPage} = req.query;

       console.log(req.query);

       page = page ? page : Math.floor(Math.random() * 10) + 1; //guaranteed 10 pages in dataset
       sort = sort ? sort : 1; //1 is ascending -1 is descending

       let payload = {};
      //  itemsPerPage = itemsPerPage < 20 ? 20 : 50;
        if(itemsPerPage >= 200){
        page = 1;

       }
       else if(itemsPerPage > 20 && itemsPerPage < 200){
        itemsPerPage = 50;
        page = page ? page : Math.floor(Math.random() * 5) + 1; //guaranteed 5 pages in dataset
       }else
       {
        itemsPerPage = 20;
       }

       let startIndex = itemsPerPage * page - itemsPerPage; //2 * 3 - 2 = 4 ||  assuming user selected page num 3 and each page contains 2 items, based on 0 indexed arrays, start num for page 3 would be 4 therefore => 2 (items/page) * 3 (selected page) = 6 (total pages) - 2 (to get to start item for the current page) = 4
       let endIndex = itemsPerPage * page; // 2 * 3 = 6

       if (title) {
         // payload["title"] = { title: `/.*${title}.*/i` };
         payload["title"] = { $regex: new RegExp(title, "i") };
        //  startIndex = 1;
       }

       if (genre_id) {
         // payload["title"] = { title: `/.*${title}.*/i` };
         payload["genre_ids"] = { $in: genre_id };
       }
      //  console.log(`Payload is: ${payload[0]}`)

       //find()
       Movie.find(payload)
         .sort({ popularity: sort })
         .then((response) => {
           const filteredResponse = response.slice(startIndex, endIndex);
          //  console.log(
          //    `${filteredResponse.length} Movies fetched successfully.`
          //  );
           res.status(200).json({
             message: `${filteredResponse.length} Movies fetched successfully.`,
             movies: filteredResponse,
           });
         })
         .catch((err) => {
           res.status(400).json({ error: err });
         });
    
    
    });
 
 
}

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  filteredMovies,
  
};



/*



exports.filterRestaurants = (req, res) => {

  let {mealtype, cuisine, location, lcost, hcost, sort, page } = req.body;

  page = page ? page : 1;
  sort = sort ? sort : 1; //1 is ascending -1 is descending

  let payload = {};
  let itemsPerPage = 2;

  let startIndex = itemsPerPage * page - itemsPerPage; //2 * 3 - 2 = 4 ||  assuming user selected page num 3 and each page contains 2 items, based on 0 indexed arrays, start num for page 3 would be 4 therefore => 2 (items/page) * 3 (selected page) = 6 (total pages) - 2 (to get to start item for the current page) = 4
  let endIndex = itemsPerPage * page; // 2 * 3 = 6

  if(mealtype){
    payload['type.mealtype'] = mealtype;
  }

  if(mealtype && cuisine){
    payload['type.mealtype'] = mealtype;
    payload['Cuisine.cuisine'] = { $in : cuisine}
  }

  if(mealtype && lcost && hcost){ //use split function to extract lcost and hcost , the delimiter should be hyphen since the cost filter uses [500 - 1000] descriptions
    payload['type.mealtype'] = mealtype;
    payload["cost"] = { $lte: hcost, $gte: lcost };
  }


if (mealtype && cuisine && lcost && hcost) {
  payload["type.mealtype"] = mealtype;
  payload["Cuisine.cuisine"] = { $in: cuisine };
  payload["cost"] = { $lte: hcost, $gte: lcost };
}

if(mealtype && location){
  payload['type.mealtype.mealtype'] = mealtype;
  payload['locality'] = location;
}

if (mealtype && location && cuisine) {
  payload["type.mealtype.mealtype"] = mealtype;
  payload["locality"] = location;
    payload["Cuisine.cuisine"] = { $in: cuisine };
}

if (mealtype && location && lcost && hcost) {
  payload["type.mealtype.mealtype"] = mealtype;
  payload["locality"] = location;
  payload["cost"] = { $lte: hcost, $gte: lcost };
}


if (mealtype && location && cuisine && lcost && hcost) {
  payload["type.mealtype.mealtype"] = mealtype;
  payload["locality"] = location;
  payload["Cuisine.cuisine"] = { $in: cuisine };
  payload["cost"] = { $lte: hcost, $gte: lcost };
}

//find()
RestaurantSchema.find(payload)
  .sort({ cost: sort })
  .then((response) => {
    const filteredResponse = response.slice(startIndex, endIndex);
    res.status(200).json({
      message: `${filteredResponse.length} Restaurants fetched successfully.`,
      restaurants: filteredResponse,
    });
  })
  .catch((err) => {
    res.status(400).json({ error: err });
  });


*/
