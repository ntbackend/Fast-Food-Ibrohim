const routes = require("../routes");
const path = require("node:path");
const cookieParser = require('cookie-parser');

const modules = async (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.set('view engine', 'ejs');
    app.set("views", path.join(__dirname, "../views"));

    app.use("/api", routes);
};

module.exports = modules;