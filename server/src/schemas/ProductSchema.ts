import { z } from 'zod';

export const ProductSchema = z.object({
    title: z.string(),
    rating: z.number().optional().nullable(),
    reviewCount: z.number().optional().nullable(),
    imageUrl: z.string().url().optional().nullable() //In prodution, Fill the default value for a 'No Image' file
});