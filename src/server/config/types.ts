export enum Stage {
    Development = 'development',
    Test = 'test',
    Staging = 'staging',
    Production = 'production',
    Unknown = 'unknown'
}


export interface Config {
    useConsoleLogger?: boolean;
    instrumentForNewrelic?: boolean;
    stage?: Stage;
}
