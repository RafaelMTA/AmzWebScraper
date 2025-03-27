import {z} from 'zod';

export const SearchQuerySchema = z.object({
    keyword: z.string().min(1, 'Keyword cannot be empty').max(100, 'Keyword cannot exceed 100 characters')
});