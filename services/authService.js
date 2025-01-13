import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const register = async (data) => {
  const { username, password, name } = data;

  const user = await prisma.user.findUnique({ where: { username } });

  if (user) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
    },
  });
};

export const login = async (data) => {
  const { username, password } = data;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error("Username not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Password is incorrect");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};

export const myProfile = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return { username: user.username, name: user.name };
};
