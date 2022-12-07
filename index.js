require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app.js");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("*** DATABASE CONNECTED ***")
    app.listen(process.env.PORT, () => {
      console.log(`*** SERVER LISTENING ON PORT ${process.env.PORT}`)
    })
  })
  .catch(console.log);
