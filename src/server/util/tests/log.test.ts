import log from '../log';

test('logger should be initialized with app name and log config', () => {
    expect(log.fields.name).toBe('KoaReactStarterService');
});
