import { checkSchema } from "express-validator";

export default checkSchema({
  title: {
    trim: true,
    in: ["query"],
    errorMessage: "title is required",
    notEmpty: true,
  },
  // artist: {
  //   trim: true,
  //   in: ["query"],
  //   errorMessage: "artist is required",
  //   notEmpty: true,
  // },
});
