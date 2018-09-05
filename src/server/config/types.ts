export enum Stage {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Unknown = 'unknown'
}


export interface Config {
    useConsoleLogger?: boolean;
    instrumentForNewrelic?: boolean;
    stage?: Stage;
}
