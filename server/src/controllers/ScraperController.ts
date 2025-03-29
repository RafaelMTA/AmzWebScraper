import type { Request, Response } from 'express';
import { ScraperService } from '../services/ScraperService';
import type { IScraperController } from '../interfaces/IScraperController';
import type { IScraperService } from '../interfaces/IScraperService';

//The Controller classes will handle all the application request and response
//Creates an instance of the scraper service,
//Retrieve the keyword from the request query and validate it
//Execute the scraper service, and returns the correpondent result or an error in case of failure
export class ScraperController implements IScraperController{
    //Dependency Injection - Scraper Service
    constructor(private readonly scraperService: IScraperService){}

    handle = async (req: Request, res: Response) : Promise<any>=> {
        try{
            const { keyword } = req.query;

            if(!keyword) return res.status(400).json({error: 'Keyword is required'});
    
            const result = await this.scraperService.execute(keyword.toString());
    
            if(result instanceof Error) return res.status(400).json(result.message);
    
            return res.status(200).json(result);
        }catch(error){
            throw error;
        }       
    }
}
