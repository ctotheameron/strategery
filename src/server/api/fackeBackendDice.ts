export function rollDie(sides: number): Promise<number> {
    if (!Number.isSafeInteger(sides) || sides <= 0) {
        return Promise.reject(new Error(`Cannot roll a ${sides} sided die`));
    }

    const roll = Math.floor(Math.random() * sides) + 1;
    return new Promise(resolve => setTimeout(() => resolve(roll), 200));
}
