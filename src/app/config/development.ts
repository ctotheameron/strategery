import { ConfigOptions, Stage } from './types';


const developmentConfig: ConfigOptions = {
    stage: Stage.Development,
    baseURL: 'http://localhost:4000/api'
};


export default developmentConfig;
