/**
 * logger
 * @module util/logger
 */

import { createLogger } from 'bunyan';
import { bunyanToGelf } from 'gelf-stream';
import { Writable } from 'stream';


const GELF_LEVEL = new Map<number, string>([
    [0, 'EMERGENCY'],
    [1, 'ALERT'],
    [2, 'CRITICAL'],
    [3, 'ERROR'],
    [4, 'WARNING'],
    [5, 'NOTICE'],
    [6, 'INFO'],
    [7, 'DEBUG']
]);


function makeGelfConsoleStream(name: string) {
    return new Writable({
        write(chunk, _, callback) {
            const gelfFormat = bunyanToGelf(JSON.parse(chunk));

            // TODO: Seems like our logstasher impl isn't respecting proper GELF
            // format so we are adding these fields manually.
            gelfFormat.source = name;
            gelfFormat.message = gelfFormat.short_message;
            gelfFormat['@timestamp'] = new Date();
            gelfFormat.level = GELF_LEVEL.get(
                Number(gelfFormat.level)
            ) || 'WARN';

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
