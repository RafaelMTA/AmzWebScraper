import express from "express";
import { ScraperController } from "../controllers/ScraperController";
import { ScraperService } from "../services/ScraperService";
import type { IScraperController } from "../interfaces/IScraperController";

//Register all app routes
class AppRoutes {
    private readonly router: express.Router;

    //Dependency Injection - scraper controller
    constructor(private readonly scraperController: IScraperController){
        this.router = express.Router();
    }

    //Define app routes
    initializeRoutes(): express.Router {
        this.router.get('/api/scrape', this.scraperController.handle);
        return this.router;
    }
}

export default new AppRoutes(new ScraperController(new ScraperService())).initializeRoutes();
