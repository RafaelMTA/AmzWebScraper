import "express-async-errors";
import express from "express";
import routes from "./routes/AppRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/ErrorMiddleware";

class App{
    public server;

    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
        //Must be set after routes
        this.errorHandling();
    }

    middlewares = () => {
        this.server.use(express.json());       
    }

    routes = () => {
        this.server.use('/api', routes);
    }

    private errorHandling(){
        //404
        this.server.use(notFoundHandler);
        //All other errors
        this.server.use(errorHandler);
    }
}

export default new App().server;