import stagingConfig from './staging';
import { Config } from './types';


const integrationConfig: Config = {
    ...stagingConfig,
    instrumentForNewrelic: false
};


export default integrationConfig;
