import { z } from 'zod';
import { EnvSchema } from '../schemas/EnviromentSchema';
import { validateEnv } from '../utils/validation/EnvValidation';

type EnvVariables = z.infer<typeof EnvSchema>;

//Configures and validates the application enviroment variables
export class AppConfig{
  private static instance: AppConfig;
  public readonly env: EnvVariables;

  private constructor() {   
    this.env = validateEnv();
  }

  // Singleton pattern, guarantees a unique instance of the app configuration
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}



