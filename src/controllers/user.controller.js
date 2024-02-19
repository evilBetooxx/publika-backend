import User from '../models/user.model.js';

export const getUsersOnline = async (req, res) => {
    try {
        const users = await User.find({ online: true });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}