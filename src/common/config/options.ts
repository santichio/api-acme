import * as YAML from 'yaml'
import { readFileSync } from 'fs'
import { join } from 'path'

import { ConfigOptionsInterface } from './interfaces/ConfigOptions.interface'
import { envEnum } from './enums/env.enum'

/**
 * Loads configuration from YAML file
 * Tries to find config file in root directory
 * @returns Configuration options
 */
export default (): ConfigOptionsInterface => {
    const filePath = join(process.cwd(), 'config.yaml')

    try {
        // Read and parse config file
        const configOptions = YAML.parse(
            readFileSync(filePath, 'utf8')
        ) as ConfigOptionsInterface

        // Ensure production deploy doesn't auto sync database
        if (configOptions.env.nodeEnv === envEnum.PRODUCTION) {
            configOptions.database.ormAutoSync = false
        }

        return configOptions
    } catch (err) {
        if (err instanceof Error && err.message.includes('ENOENT')) {
            throw new Error(
                'Could not find config.yaml file in root directory!'
            )
        }

        throw err
    }
}
