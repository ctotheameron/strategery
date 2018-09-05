import { Config, Stage } from './types';


const defaultConfig: Config = {
    stage: Stage.Unknown,
    useConsoleLogger: false,
    instrumentForNewrelic: false
};


export default defaultConfig;
