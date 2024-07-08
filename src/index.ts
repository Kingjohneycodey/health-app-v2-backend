import config from './config';
import mongoose, { ConnectOptions }  from 'mongoose';
import app from './app';
import logger from './utils/logger';

const startServer = async () => {
    try {
        const options: ConnectOptions = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        };
        
        await mongoose.connect(config.mongodbUri, options);
        logger.info('Connected to MongoDB');

        app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
    }
};

startServer();
