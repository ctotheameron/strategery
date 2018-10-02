import * as t from 'io-ts';
import { reporter } from 'io-ts-reporters';


export function decodeAsync<T, O, I>(
    validator: t.Type<T, O, I>,
    input: I
): Promise<T> {
    const result = validator.decode(input);

    return result.fold(
        () => Promise.reject(new Error(reporter(result).join('\n'))),
        value => Promise.resolve(value)
    );
}
