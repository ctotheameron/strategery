import { Config, Stage } from './types';


const defaultConfig: Config = {
    stage: Stage.Unknown,
    baseURL: '/api',
    paths: {
        cards: '/cards',
        dice: '/dice'
    }
};


export default defaultConfig;
