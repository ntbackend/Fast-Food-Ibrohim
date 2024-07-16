const isAdmin = (req, res, next) => {
    const { isAdmin } = req.user;

    if (!isAdmin) return res.status(400).json({ message: "Siz admin emassiz" });

    next();
};

module.exports = isAdmin;