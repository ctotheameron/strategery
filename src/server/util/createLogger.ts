/**
 * logger
 * @module util/logger
 */

import { createLogger } from 'bunyan';
import { bunyanToGelf } from 'gelf-stream';
import { Writable } from 'stream';


function gelfLevel(number: number) {
    switch (number) {
    case 0: return 'EMERGENCY';
    case 3: return 'ERROR';
    case 6: return 'INFO';
    case 7: return 'DEBUG';
    default: return 'WARNING';
    }
}


function makeGelfConsoleStream(name: string) {
    return new Writable({
        write(chunk, _, callback) {
            const gelfFormat = bunyanToGelf(JSON.parse(chunk));

            // TODO: Seems like our logstasher impl isn't respecting proper GELF
            // format so we are adding these fields manually.
            gelfFormat.source = name;
            gelfFormat.message = gelfFormat.short_message;
            gelfFormat['@timestamp'] = new Date();
            gelfFormat.level = gelfLevel(Number(gelfFormat.level));

            // tslint:disable-next-line no-console
            console.log(JSON.stringify(gelfFormat));
            callback();
        },
        objectMode: true
    });
}


interface LoggerParameters {
    name: string;
    useConsole?: boolean;
}


export default function ({ name, useConsole = false }: LoggerParameters) {
    const stream = useConsole ? process.stdout : makeGelfConsoleStream(name);
    return createLogger({ name, stream });
}
