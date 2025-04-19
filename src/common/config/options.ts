import * as YAML from 'yaml'
import { readFileSync } from 'fs'

import { ConfigOptionsInterface } from './interfaces/ConfigOptions.interface'
import { envEnum } from './enums/env.enum'

const CONFIG_FILE_PATH = process.cwd() + '/dist/config.yaml'

export default (): ConfigOptionsInterface => {
    const configOptions = YAML.parse(
        readFileSync(CONFIG_FILE_PATH, 'utf8')
    ) as ConfigOptionsInterface

    // Ensure production deploy dont auto sync database
    if (configOptions.env.nodeEnv === envEnum.PRODUCTION) {
        configOptions.database.ormAutoSync = false
    }

    return configOptions
}
