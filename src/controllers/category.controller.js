import Category from '../models/category.model.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryById = async (req, res) => {
    const { id } = req.body;

    try {
        const category = await Category.findById(id);
        res.json(category);
    } catch (error) {
        console.log(error);
    }
}

export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const categoryFound = await Category.findOne({ name });
        if (categoryFound) return res.status(400).json(["La categoría ya existe"]);

        const newCategory = new Category({ name });
        const categorySaved = await newCategory.save();
        res.json(categorySaved);
    } catch (error) {
        console.log(error);
    }
}

