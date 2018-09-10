import { Config } from './types';
import stagingConfig from './staging';


const integrationConfig: Config = {
    ...stagingConfig,
    baseURL: 'http://localhost:4000/api'
};


export default integrationConfig;
