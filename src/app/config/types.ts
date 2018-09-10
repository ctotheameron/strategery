export enum Stage {
    Development = 'development',
    Test = 'test',
    Staging = 'staging',
    Production = 'production',
    Unknown = 'unknown'
}


export interface Config {
    baseURL?: string;
    stage?: Stage;
}
