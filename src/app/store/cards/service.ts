import api from './api';
import { CardsDraw, CardsDrawRequest } from './types';


export async function draw(request: CardsDrawRequest) {
    try {
        const res = await api.post('/draw', request);
        return res.data as CardsDraw;
    } catch (err) {
        let message = 'Uh oh!';
        if (err.response && err.response.data) message = err.response.data;
        throw new Error(message);
    }
}
