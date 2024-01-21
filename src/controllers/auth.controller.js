import User from "../models/user.model.js";
import bycript from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { createAccesToken } from "../libs/jwt.js";

config();

export const register = async (req, res) => {
    const { username, password, photo } = req.body;

    try {
        const userFound = await User.findOne({ username });
        if (userFound) return res.status(400).json({ message: "Username already exist" });

        
    } catch (error) {
        console.log(error);
    }
}