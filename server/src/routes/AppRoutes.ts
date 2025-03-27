import express from "express";
import { ScraperController } from "../controllers/ScraperController";

class AppRoutes {
    private readonly router: express.Router;   
    private readonly scraperController: ScraperController;

    constructor(){
        this.router = express.Router();
        this.scraperController = new ScraperController();
    }

    //Define app routes
    initializeRoutes(): express.Router {
        this.router.get('/api/scrape', this.scraperController.handle);
        return this.router;
    }
}

export default new AppRoutes().initializeRoutes();
