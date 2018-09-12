import { resolve } from 'path';

process.env.NODE_CONFIG_DIR = resolve(__dirname, '../config');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
process.env.NODE_CONFIG_STRICT_MODE = 'true';

import * as config from 'config';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const globalAny: any = global;
globalAny.CONFIG = config;

configure({ adapter: new Adapter() });
