import { z } from 'zod';
import { EnvSchema } from "../../schemas/EnviromentSchema";

type EnvVariables = z.infer<typeof EnvSchema>;

 //validates the local enviroment variables
 export const validateEnv = () : EnvVariables => {
    try{
        const parseEnv = EnvSchema.parse(process.env);
        return parseEnv;
    }catch(error){
        if (error instanceof z.ZodError) {
            console.error('Environment Variable Validation Failed:');
            error.errors.forEach(err => {
              console.error(`- ${err.path}: ${err.message}`);
            });
            process.exit(1);
          }
        throw error;
    }
}