import { DynamicModule, Module } from '@nestjs/common'
import {
    ConfigModuleOptions,
    ConfigModule as NestConfigModule
} from '@nestjs/config'
import { ClsModule } from 'nestjs-cls'
import { randomUUID } from 'crypto'
import { existsSync } from 'fs'

import { HttpRequest } from '../interfaces/HttpResquest.interface'
import { envConfigOptionsSchema } from './schemas/envConfigOptions.schema'
import options from './options'
import { join } from 'path'

@Module({})
export class ConfigModule {
    /**
     * Register NestJs Config module and Nest CLS Module
     * @returns Dynamin module
     */
    static register(): DynamicModule {
        // Check the existence of config.yaml and .env files
        const yamlFileExists = existsSync(join(process.cwd(), 'config.yaml'))
        const envFileExists = existsSync(join(process.cwd(), '.env'))

        if (!yamlFileExists && !envFileExists) {
            throw new Error(
                'Could not find any configuration file in root directory!'
            )
        }

        // Assign correc option object by the config file type
        const configOptions: ConfigModuleOptions = yamlFileExists
            ? {
                  // YAML file options
                  ignoreEnvFile: true,
                  load: [options],
                  expandVariables: true
              }
            : {
                  // .ENV file options
                  validationSchema: envConfigOptionsSchema,
                  validationOptions: {
                      allowUnknow: false,
                      abortEarly: false
                  }
              }

        // Return the dynamic module object
        return {
            module: ConfigModule,
            imports: [
                NestConfigModule.forRoot({
                    isGlobal: true,
                    cache: true,
                    ...configOptions
                }),
                ClsModule.forRoot({
                    global: true,
                    middleware: {
                        mount: true,
                        generateId: true,
                        idGenerator: (req: HttpRequest) => {
                            const id = req.headers['X-Request-Id']

                            return Array.isArray(id) || !id ? randomUUID() : id
                        }
                    }
                })
            ]
        }
    }
}
