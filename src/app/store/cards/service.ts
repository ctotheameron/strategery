import api from './api';
import { CardsDraw, CardsDrawRequest } from './types';


export async function draw(request: CardsDrawRequest) {
    const res = await api.post('/draw', request);
    return res.data as CardsDraw;
}
