import { resolve } from 'path';

process.env.NODE_CONFIG_DIR = resolve(__dirname, '../config');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
process.env.NODE_CONFIG_STRICT_MODE = 'true';

// This is required until @material-ui/core@4.x because we do not commonly
// run our unit tests inside an <MuiTheme /> wrapper. As long as we wrap our
// application in the theme provided by @serviceslabs/material-ui-pro we should
// not see these deprecation warnings at runtime.
process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS = 'true';

import * as config from 'config';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const globalAny: any = global;
globalAny.CONFIG = config;

configure({ adapter: new Adapter() });
