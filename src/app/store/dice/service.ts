import api from './api';
import { DiceRoll, DiceRollRequest } from './types';


export async function roll(request: DiceRollRequest) {
    try {
        const res = await api.post('/roll', request);
        return res.data as DiceRoll;
    } catch (err) {
        const message = err.response.data;
        throw message ? new Error(message) : err;
    }
}
