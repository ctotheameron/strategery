declare class GelfFormat {
    source: string;
    message: string;
    short_message: string;
    '@timestamp': Date;
    level: string | number;
}


export function bunyanToGelf(log: string): GelfFormat
