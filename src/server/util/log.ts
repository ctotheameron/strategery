import config from '../config';
import createLogger from './createLogger';


const log = createLogger({
    name: 'KoaReactStarterService', useConsole: config.useConsoleLogger
});


export default log;
