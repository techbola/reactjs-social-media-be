import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

// setup bodyParser to be able to properly send our requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// use express middleware to connect routes to the application
app.use("/posts", postRoutes); // http://localhost:5000/posts

// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = process.env.MongoDB_URI;
const PORT = process.env.PORT || 5000;

// connect to out database
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));

// make sure we don't get any warnings on the console
mongoose.set("useFindAndModify", false);
