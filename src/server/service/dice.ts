import { rollDie } from '../api/fackeBackendDice';


interface RollOptions {
    sides: number;
    number: number;
}


export async function roll({ sides, number }: RollOptions): Promise<number[]> {
    return Promise.all([...Array(number)].map(() => rollDie(sides)));
}
