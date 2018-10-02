interface Paths {
    cards: string;
    dice: string;
}


export enum Stage {
    Development = 'development',
    Test = 'test',
    Staging = 'staging',
    Production = 'production',
    Unknown = 'unknown'
}


export interface ConfigOptions {
    baseURL?: string;
    stage?: Stage;
    paths?: Paths;
}


export interface Config {
    baseURL: string;
    stage: Stage;
    paths: Paths;
}
