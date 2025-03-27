import dotenv from 'dotenv';
import app from './src/app';
import { AppConfig } from './src/config/AppConfig';

//Load enviroment variables
dotenv.config();

//Getting the enviroment variables instance
const config = AppConfig.getInstance();

//Starts the server
app.listen(config.env.PORT, () => {
    console.log(`Server running on port: ${config.env.PORT}`);
    console.log(`Environment: ${config.env.NODE_ENV}`);
});