import api from './api';
import { CardsDraw, CardsDrawRequest } from './types';


export async function draw(request: CardsDrawRequest) {
    try {
        const res = await api.post('/draw', request);
        return res.data as CardsDraw;
    } catch (err) {
        const message = err.response.data;
        throw message ? new Error(message) : err;
    }
}
