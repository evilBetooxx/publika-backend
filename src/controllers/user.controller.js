import User from '../models/user.model.js';

export const getUsersOnline = async (req, res) => {
    try {
        const users = await User.find({ online: true });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}