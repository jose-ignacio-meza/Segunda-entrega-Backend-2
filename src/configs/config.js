import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    url_mongo : process.env.MONGO_URL || 'mongodb://localhost:27017/express-mongo',
    secret_key: process.env.SECRET_KEY
};