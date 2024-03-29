import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { createAccessToken } from "../libs/jwt.js";

config();

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (userFound) return res.status(400).json(["El usuario está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const defaultPhoto =
      "https://res.cloudinary.com/dn1ng7anm/image/upload/v1699914249/xtoyv31uysdujmqrv7wn.jpg";

    const newuser = new User({
      username,
      password: passwordHash,
      photo: defaultPhoto,
      online: true,
    });

    const userSaved = await newuser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      photo: userSaved.photo,
      onlie: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });

    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    userFound.online = true;
    await userFound.save();

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      photo: userFound.photo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    // Buscar al usuario en la base de datos
    const user = await User.findById(req.user.id);

    if (!user) {
      console.log('No se encontró ningún usuario con el ID proporcionado');
      return res.sendStatus(404);
    }

    user.online = false;
    await user.save();

    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  } catch (error) {
    console.log('Error al hacer logout:', error);
    return res.sendStatus(500);
  }
};


export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No estás autorizado" });
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No estás autorizado" });

    const userFound = await User.findById(user.id);

    if (!userFound)
      return res.status(401).json({ message: "No estás autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      photo: userFound.photo,
    });
  });
};
