export enum Stage {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Unknown = 'unknown'
}


export interface Config {
    baseURL?: string;
    stage?: Stage;
}
