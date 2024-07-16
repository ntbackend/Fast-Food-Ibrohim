const { connect } = require('mongoose');
const config = require("../../config");

const runner = async (app) => {
    await connect(config.mongodbUrl);
    console.log("MongoDB connected")
    const port = config.port
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
};

module.exports = runner;