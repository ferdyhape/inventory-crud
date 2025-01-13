import {
  validateRegister,
  validateLogin,
} from "../validation/validationAuth.js";
import { validationResult } from "express-validator";
import {
  register as registerService,
  login as loginService,
  myProfile as myProfileService,
} from "../services/authService.js";

export const register = async (req, res) => {
  await Promise.all(validateRegister.map((validator) => validator.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, name } = req.body;

  try {
    const user = await registerService({ username, password, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  await Promise.all(validateLogin.map((validator) => validator.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const token = await loginService({ username, password });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const myProfile = async (req, res) => {
  const user = await myProfileService(req.user.id);
  res.status(200).json(user);
};
