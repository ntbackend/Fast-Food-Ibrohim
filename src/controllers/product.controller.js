const Product = require("../models/product.model");
const Category = require("../models/category.model");

const createProductPage = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("products/create", { categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Product yaratish funksiyasi
const createProduct = async (req, res, next) => {
  try {
    const { name, category, photo, price } = req.body;

    // Category nomini bazadan topish
    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Yangi product yaratish
    const newProduct = new Product({
      name,
      category: foundCategory._id, // Category ID sifatida qo'llanish
      photo,
      price,
    });

    // Productni saqlash
    await newProduct.save();

    // Redirect or send response
    res.redirect("/api/products/list");
  } catch (error) {
    next(error);
  }
};

const listProducts = (req, res) => {
  var locals = {
    title: "Create Product",
  };

  Product.find()
    .populate("category")
    .then((products) => {
      res.render("products/list", { products, locals, currentUser: req.user });
    })
    .catch((err) => {
      console.error("Error fetching guides:", err);
      res.status(500).send("Error fetching guides");
    });
};

const showProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return req.flash("error", "Bunday Maxsulot yo'q topilmadi");
    }

    res.render("products/show", { product });
  } catch (error) {
    next(error);
  }
};

const updateProductPage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    const categories = await Category.find();
    if (!product) {
      req.flash("error", "Maxsulot topilmadi");
      return res.redirect("/products/list");
    }

    res.render("products/edit", { product, categories });
  } catch (error) {
    next(error);
    res.redirect("/products/list");
  }
};
// Product yangilash funksiyasi
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, photo, price, category } = req.body;

    console.log("category", category ? category : undefined)

    const foundCategory = await Category.findOne({ name: category });

    await Product.findByIdAndUpdate(
      id,
      { name, photo, price, category: foundCategory._id },
      { new: true }
    );
    res.redirect("/api/products/list");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/api/products/list");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductPage,
  createProduct,
  listProducts,
  showProduct,
  updateProductPage,
  updateProduct,
  deleteProduct,
  getProducts,
};
