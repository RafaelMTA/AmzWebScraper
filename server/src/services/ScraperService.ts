import { z } from 'zod';
import axios from 'axios';
import type { AxiosResponse, AxiosInstance } from 'axios';
import { JSDOM } from 'jsdom';
import { ProductSchema } from '../schemas/ProductSchema';
import { SearchQuerySchema } from '../schemas/SearchQuerySchema';
import { AxiosErrorHandler } from '../handler/AxiosErrorHandler';
import { AppConfig } from '../config/AppConfig';
import type { IScraperService } from '../interfaces/IScraperService';
import { AppError } from '../utils/error/AppError';
import { ServiceUnavailableError } from '../utils/error/ServiceUnavailableError';

//Creates a type from the Product Schema
type Product = z.infer<typeof ProductSchema>;

//The Service classes will execute the application logic
//Creates an axios client
//Receives the search keyword and makes a call to the website to be scraped
//Retrieve the HTML using JSDOM and extract the data from the corresponding HTML elements
//Validates each entry, accordinly to the Product Schema
export class ScraperService implements IScraperService{ 
    private client: AxiosInstance;
    private readonly appConfig = AppConfig.getInstance();
    
    //Initiate the axios client
    constructor(baseURL: string = this.appConfig.env.AMAZON_API_PREFIX){
        this.client = axios.create(
            {
                baseURL: baseURL,
                //prevent amazon from blocking the request - Not guaranteed
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
                    'Content-Type': 'text/html; charset=iso-8859-1'
                }
            }
        );        
    }
    
    execute = async(keyword: string) : Promise<Product[]> => {
        try{
            // Validate input
            SearchQuerySchema.parse({ keyword });
            
            // Encode keyword for URL
            const encodedKeyword = encodeURIComponent(keyword);
            const query = `/s?k=${encodedKeyword}`;
            const response: AxiosResponse = await this.client.get(query);
            // Additional check for 503 in response 
            if (response.status === 503) {
                throw new ServiceUnavailableError('Service temporarily unavailable');
            }
            // Parse HTML with JSDOM
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            
            // Extract product listings
            const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
            
            // Process each product
            const products: Product[] = Array.from(productElements).map(productElement => {
                
            // Extract title
            const titleElement = productElement.querySelector('a h2 span');
            const title = titleElement ? titleElement.textContent?.trim() ?? 'N/A' : 'N/A';
            
            // Extract rating
            const ratingElement = productElement.querySelector('.a-icon-alt');
            /// Due to different regional standards, the rating is separated by comma not dot. 
            const ratingText = ratingElement ? ratingElement.textContent?.trim().replace(/,/g, ".") : null; 
            const rating = ratingText ? parseFloat(ratingText.split(' ')[0]!) : null;
            
            // Extract review count
            const reviewElement = productElement.querySelector('a .a-size-base.s-underline-text');
            const reviewText = reviewElement ? reviewElement.textContent?.trim() : null;
            const reviewCount = reviewText ? parseInt(reviewText.replace(/,/g, ''), 10) : null;
            
            // Extract image URL
            const imageElement = productElement.querySelector('.s-image') as HTMLImageElement | null;
            const imageUrl = imageElement ? imageElement.src : null;

            return { 
                title, 
                rating, 
                reviewCount, 
                imageUrl 
            };
            }).filter(product => product.title !== 'N/A'); // Filter out invalid results

            //Validates each entry
            const validatedProducts = products.map((product: unknown) => ProductSchema.parse(product));
            return validatedProducts;
        }catch(error){
            if (error instanceof z.ZodError) {
                throw new AppError(`Error on Schema validation: ${error.message}`, 400);
            }

            if(axios.isAxiosError(error)){
                AxiosErrorHandler(error);
            }
            
            throw new AppError(`Error on scraping: ${error instanceof(Error) ? error.message : 'Unknown Error'}`, 500);
        }
    }

}
