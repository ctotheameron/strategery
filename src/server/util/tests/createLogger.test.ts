import { createLogger as bunyanCreate } from 'bunyan';

import createLogger from '../createLogger';
import { Writable } from 'stream';


let mockStream: Writable;

jest.mock('bunyan', () => ({
    createLogger: jest.fn(({ name, stream }) => {
        mockStream = stream;
        return `Logger name:${name} stream:${stream.eventNames()}`;
    })
}));


beforeEach(jest.clearAllMocks);


test('should use stdout if useConsole is set', () => {
    const name = 'name';
    const useConsole = true;

    const origEventNames = process.stdout.eventNames;
    process.stdout.eventNames = () => ['foo'];

    expect(
        createLogger({ name, useConsole })
    ).toBe('Logger name:name stream:foo');

    expect(bunyanCreate).toBeCalledWith({
        name, stream: expect.any(Object)
    });

    process.stdout.eventNames = origEventNames;
});


test('should use custom gelf stream is useConsole is false', () => {
    const name = 'name';
    const useConsole = false;

    // tslint:disable-next-line no-console
    console.log = jest.fn();
    createLogger({ name, useConsole });
    mockStream.write(JSON.stringify({ short_message: 'foo' }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"message":"foo"/)
    );

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"source":"name"/)
    );

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(expect.stringMatching(/"@timestamp"/));
});


test('should default to WARNING if no level', () => {
    const name = 'name';

    // tslint:disable-next-line no-console
    console.log = jest.fn();
    createLogger({ name });
    mockStream.write(JSON.stringify({ short_message: 'foo' }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"WARNING"/)
    );
});


test('should translate gelf level', () => {
    const name = 'name';
    const useConsole = false;

    // tslint:disable-next-line no-console
    createLogger({ name, useConsole });
    mockStream.write(JSON.stringify({ short_message: 'foo', level: 10 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"DEBUG"/)
    );

    mockStream.write(JSON.stringify({ short_message: 'foo', level: 20 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"DEBUG"/)
    );

    mockStream.write(JSON.stringify({ short_message: 'foo', level: 30 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"INFO"/)
    );

    mockStream.write(JSON.stringify({ short_message: 'foo', level: 40 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"WARNING"/)
    );

    mockStream.write(JSON.stringify({ short_message: 'foo', level: 50 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"ERROR"/)
    );

    mockStream.write(JSON.stringify({ short_message: 'foo', level: 60 }));

    // tslint:disable-next-line no-console
    expect(console.log).toBeCalledWith(
        expect.stringMatching(/"level":"EMERGENCY"/)
    );
});
