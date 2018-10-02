import { Server } from 'http';

import * as request from 'supertest';

import { CardsDraw, CardsDrawRequest } from '../../src/shared/types/cards';

import app from '../../src/server/app';


let server: Server;


beforeAll(() => {
    return new Promise((resolve) => {
        server = app.listen(resolve);
    });
});


afterAll(() => server.close());


describe('/api/cards/draw', () => {
    const url = '/api/cards/draw';
    const drawRegxp = /[AKQJ098765432][♦︎♠︎♣♥]/;

    test('variety of positive decks and numbers should work', async () => {
        for (let i = 0; i < 10; i += 1) {
            const number = Math.floor(Math.random() * 1000) + 1;
            const decks = Math.floor(Math.random() * 1000) + 1;
            const drawRequest: CardsDrawRequest = { number, decks };

            const res = await request(server).post(url).send(drawRequest);
            const body: CardsDraw = res.body;

            expect(res.status).toBe(200);
            expect(body.cards).toHaveLength(number);

            body.cards.forEach((card) => {
                expect(card).toMatch(drawRegxp);
            });

            expect(body.request).toMatchObject(drawRequest);
        }
    });


    test('should return 400 if decks < 1', async () => {
        const number = 1;
        const decks = 0;
        const drawRequest: CardsDrawRequest = { number, decks };
        const res = await request(server).post(url).send(drawRequest);
        expect(res.status).toBe(400);
    });


    test('should return 400 if number < 1', async () => {
        const number = 0;
        const decks = 1;
        const drawRequest: CardsDrawRequest = { number, decks };
        const res = await request(server).post(url).send(drawRequest);
        expect(res.status).toBe(400);
    });


    test('should return 400 if invalid request', async () => {
        const drawRequest = {};
        const res = await request(server).post(url).send(drawRequest);
        expect(res.status).toBe(400);
    });
});
