const Category = require("../models/category.model");

const createCategoryPage = async (req, res) => {
  try {
    res.render("categories/create");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, photo } = req.body;
    const newCategory = new Category({ name, photo });
    await newCategory.save();
    res.redirect("/api/categories/list");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listCategory = (req, res, next) => {
  Category.find()
    .then((category) => {
      res.render("categories/list", { category });
    })
    .catch((err) => {
      next(err);
    });
};

const showCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return req.flash("error", "Bunday categoriya topilmadi");
    }

    res.render("categories/show", { category });
  } catch (error) {
    next(error);
  }
};

const updateCategoryPage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      req.flash("warning", "Category topilmadi");
      return res.redirect("/categories/list");
    }

    res.render("categories/edit", { category });
  } catch (error) {
    req.flash("error", "Taxrirlashda xatolik");
    next(error);
    res.redirect("/api/categories/list");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/api/categories/list");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect("/api/categories/list")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listCategory,
  getCategories,
  createCategoryPage,
  showCategory,
  createCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
