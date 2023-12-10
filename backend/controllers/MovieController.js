const bodyParser = require("body-parser");
const Movie = require("../models/movieSchema");

//list all movies
exports.getMovies = async (req, res) => {
   try {
     const data = await Movie.find();
     res.json(data);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
  
};


//filtered movies

exports.filteredMovies = async (req, res) => {
  let { title, genre_id, lowrating, highrating, sort, page } = req.body;

  page = page ? page : Math.floor(Math.random() * 10) + 1;
  sort = sort ? sort : 1; //1 is ascending -1 is descending

  let payload = {};
  let itemsPerPage = 20;

  let startIndex = itemsPerPage * page - itemsPerPage; //2 * 3 - 2 = 4 ||  assuming user selected page num 3 and each page contains 2 items, based on 0 indexed arrays, start num for page 3 would be 4 therefore => 2 (items/page) * 3 (selected page) = 6 (total pages) - 2 (to get to start item for the current page) = 4
  let endIndex = itemsPerPage * page; // 2 * 3 = 6

  if (title) {
    // payload["title"] = { title: `/.*${title}.*/i` };
    payload["title"] = { $regex: new RegExp(title, "i") };
    startIndex = 1;
  }

    if (genre_id) {
      // payload["title"] = { title: `/.*${title}.*/i` };
      payload["genre_ids"] = { $in: genre_id };
    }

  //find()
  Movie.find(payload)
    .sort({ popularity: sort })
    .then((response) => {
      const filteredResponse = response.slice(startIndex, endIndex);
      res.status(200).json({
        message: `${filteredResponse.length} Movies fetched successfully.`,
        movies: filteredResponse,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
}




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
