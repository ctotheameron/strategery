import createLogger from '@serviceslabs/logstash-node-logger';

import config from '../config';


const log = createLogger({
    name: 'KoaReactStarterService', useConsole: config.useConsoleLogger
});


export default log;
