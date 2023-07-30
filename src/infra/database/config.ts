import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/stadGo")
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
