import api from './api';
import { DiceRoll, DiceRollRequest } from './types';


export async function roll(request: DiceRollRequest) {
    try {
        const res = await api.post('/roll', request);
        return res.data as DiceRoll;
    } catch (err) {
        let message = 'Uh oh!';
        if (err.response && err.response.data) message = err.response.data;
        throw new Error(message);
    }
}
