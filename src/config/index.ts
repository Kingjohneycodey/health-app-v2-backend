import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/health-app2',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};
