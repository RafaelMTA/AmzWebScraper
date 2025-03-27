import type { Request, Response } from 'express';
import { ScraperService } from '../services/ScraperService';

//The Controller classes will handle all the application request and response
//Creates an instance of the scraper service,
//Retrieve the keyword from the request query and validate it
//Execute the scraper service, and returns the correpondent result or an error in case of failure
export class ScraperController{
    private readonly scraperService: ScraperService;

    constructor(){
        this.scraperService = new ScraperService();
    }

    handle = async (req: Request, res: Response) : Promise<any>=> {
        const { keyword } = req.query;

        if(!keyword) return res.status(400).json({error: 'Keyword is required'});

        const result = await this.scraperService.execute(keyword.toString());

        if(result instanceof Error) return res.status(400).json(result.message);

        return res.status(200).json(result);
    }
}
