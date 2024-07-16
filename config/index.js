require("dotenv/config");

const { env } = process;

const config = {
    port: +env.PORT,
    mongodbUrl: env.DATABASE_URL,
    jwtSecretKey: env.JWT_SECRET_KEY
}

module.exports = config;