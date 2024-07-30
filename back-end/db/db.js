const mongoose = require("mongoose");
// qorYjrVr8Zso2sYj
// mongodb+srv://easyResume:<password>@easyresume.iultge6.mongodb.net/

const db = mongoose
  .connect(
    ""
  )
  .then(() => console.log("Connected!"));

  module.export = db;
