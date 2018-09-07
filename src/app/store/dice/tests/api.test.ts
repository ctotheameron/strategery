import config from '../../../config';
import api from '../api';

const baseURL = config.baseURL;


test('should be defaulted to the correct base path', () => {
    expect(api.defaults.baseURL).toBe(`${baseURL}/dice`);
});
