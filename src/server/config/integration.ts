import { Config } from './types';
import stagingConfig from './staging';


const integrationConfig: Config = {
    ...stagingConfig,
    instrumentForNewrelic: false
};


export default integrationConfig;
