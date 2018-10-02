/*
 * This file is a dirty hack
 */

import { resolve } from 'path';

process.env.NODE_CONFIG_DIR = resolve(__dirname, 'config');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
process.env.NODE_CONFIG_STRICT_MODE = 'true';
import * as config from 'config';

const globalAny: any = global;
globalAny.CONFIG = config;
