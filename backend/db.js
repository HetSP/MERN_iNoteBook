const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/iNoteBook";
  
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo"))
    .catch((e) => console.log(e.message));
};

module.exports = connectToMongo;
