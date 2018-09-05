export function rollDie(sides: number): Promise<number> {
    const roll = Math.floor(Math.random() * sides) + 1;
    return new Promise(resolve => setTimeout(() => resolve(roll), 200));
}
