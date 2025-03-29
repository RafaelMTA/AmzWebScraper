import express from "express";
import { ScraperController } from "../controllers/ScraperController";
import { ScraperService } from "../services/ScraperService";
import type { IScraperController } from "../interfaces/IScraperController";

//Register all app routes
class AppRoutes {
    //Dependency Injection - scraper controller
    constructor(
        private readonly scraperController: IScraperController = new ScraperController(new ScraperService()), 
        private readonly router: express.Router = express.Router()
    ){}

    //Define app routes
    initializeRoutes(): express.Router {
        this.router.get('/scraper', this.scraperController.handle);
        return this.router;
    }
}

export default new AppRoutes().initializeRoutes();
