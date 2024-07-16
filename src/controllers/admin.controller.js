const Admin = require('../models/admin.model');
const { hash } = require("bcryptjs")

const createAdmin = async (req, res) => {
    try {
        const { firstName, lastName, age, username, password } = req.body;

        const hashedPassword = await hash(password, 12);

        const findUser = await Admin.findOne({ username });

        if (findUser) return res.status(409).json({ message: "Email Already Exists" });

        const newAdmin = new Admin({ firstName, lastName, age, username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
}