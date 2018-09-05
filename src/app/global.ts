/*
 * This file is a dirty hack
 */

import * as config from 'config';

const globalAny: any = global;
globalAny.CONFIG = config;
