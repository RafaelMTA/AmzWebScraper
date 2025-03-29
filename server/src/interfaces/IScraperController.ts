import type { Request, Response } from 'express';

export interface IScraperController {
    handle(req: Request, res: Response) : Promise<any>;
}
