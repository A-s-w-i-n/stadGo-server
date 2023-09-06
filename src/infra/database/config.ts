import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect("mongodb+srv://aswinachuz894:stadgo@cluster0.cvp4dws.mongodb.net/stadGo")
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
