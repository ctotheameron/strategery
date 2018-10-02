import { Server } from 'http';

import * as request from 'supertest';

import { DiceRoll, DiceRollRequest } from '../../src/shared/types/dice';

import app from '../../src/server/app';


let server: Server;


beforeAll(() => {
    return new Promise((resolve) => {
        server = app.listen(resolve);
    });
});


afterAll(() => server.close());


describe('/api/dice/roll', () => {
    const url = '/api/dice/roll';


    test('variety of positive sides and numbers should work', async () => {
        for (let i = 0; i < 10; i += 1) {
            const number = Math.floor(Math.random() * 1000) + 1;
            const sides = Math.floor(Math.random() * 1000) + 1;
            const rollRequest: DiceRollRequest = { number, sides };

            const res = await request(server).post(url).send(rollRequest);
            const body: DiceRoll = res.body;

            expect(res.status).toBe(200);
            expect(body.rolls).toHaveLength(number);

            body.rolls.forEach((roll) => {
                expect(roll).toBeGreaterThanOrEqual(1);
                expect(roll).toBeLessThanOrEqual(sides);
            });

            expect(body.sum).toBeGreaterThanOrEqual(number);
            expect(body.sum).toBeLessThanOrEqual(sides * number);

            expect(body.request).toMatchObject(rollRequest);
        }
    });


    test('should return 400 if sides < 1', async () => {
        const number = 1;
        const sides = 0;
        const rollRequest: DiceRollRequest = { number, sides };
        const res = await request(server).post(url).send(rollRequest);
        expect(res.status).toBe(400);
    });


    test('should return 400 if number < 1', async () => {
        const number = 0;
        const sides = 1;
        const rollRequest: DiceRollRequest = { number, sides };
        const res = await request(server).post(url).send(rollRequest);
        expect(res.status).toBe(400);
    });


    test('should return 400 if invalid request', async () => {
        const rollRequest = {};
        const res = await request(server).post(url).send(rollRequest);
        expect(res.status).toBe(400);
    });
});
