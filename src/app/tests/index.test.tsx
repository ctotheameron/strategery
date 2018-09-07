import { render } from 'react-dom';
import { configureStore } from '../store';


document.getElementById = jest.fn(id => id);


jest.mock('react-dom', () => ({ render: jest.fn() }));
jest.mock('../store', () => ({
    configureStore: jest.fn(() => ({
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn()
    }))
}));


test('should configure store and render', () => {
    require('../index');

    expect(configureStore).toBeCalledWith({});
    expect(render).toBeCalledWith(expect.any(Object), 'app');
});
