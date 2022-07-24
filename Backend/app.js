import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json()); //it will parse all the data into json format

app.use("/api/user", router); //http://localhost:5000/api/user
app.use("/api/blog", blogrouter); //http://localhost:5000/api/blog

const url =
  "mongodb+srv://animesh:animesh@cluster0.hk7lqj5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => app.listen(5000))
  .then(() => console.log("listening on port 5000"))
  .catch((err) => console.log(err));

//userid - animesh
//password-animesh
