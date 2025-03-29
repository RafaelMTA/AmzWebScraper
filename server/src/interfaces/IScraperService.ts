import type { z } from "zod";
import type { ProductSchema } from "../schemas/ProductSchema";

type Product = z.infer<typeof ProductSchema>;

export interface IScraperService {
    execute(keyword: string): Promise<Product[] | Error>;
}