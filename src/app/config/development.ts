import { Config, Stage } from './types';


const developmentConfig: Config = {
    stage: Stage.Development,
    baseURL: 'http://localhost:4000/api'
};


export default developmentConfig;
