import { z } from 'zod';

//Set Schema, so we can make sure that all the env variables are loaded correctly
export const EnvSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    AMAZON_API_PREFIX: z.string().url().default('https://www.amazon.com.br/'),
});