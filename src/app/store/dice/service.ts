import api from './api';
import { DiceRoll, DiceRollRequest } from './types';


export async function roll(request: DiceRollRequest) {
    const res = await api.post('/roll', request);
    return res.data as DiceRoll;
}
