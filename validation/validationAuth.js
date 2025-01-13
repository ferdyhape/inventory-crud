import { body } from "express-validator";

export const validateRegister = [
  body("username").isString().withMessage("Username must be a string"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").isString().withMessage("Name must be a string"),
];

export const validateLogin = [
  body("username").isString().withMessage("Username must be a string"),
  body("password").isString().withMessage("Password must be a string"),
];
