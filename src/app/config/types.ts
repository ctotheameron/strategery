export enum Stage {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Test = 'test',
    Unknown = 'unknown'
}


export interface Config {
    baseURL?: string;
    stage?: Stage;
}
