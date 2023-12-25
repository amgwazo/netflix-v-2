const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  
    
  "_id": {
    "$oid": {
      "type": "String"
    }
  },
  "id": {
    "type": "Number"
  },
  "name": {
    "type": "String"
  }


});

module.exports = mongoose.model("Genre", genreSchema);
