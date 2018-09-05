import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { shallow } from 'enzyme';

import Cards from '../cards/Cards';
import Dice from '../dice/Dice';
import App from '../App';


test('should have Links to cards and dice', () => {
    const app = shallow(<App />);
    expect(app.find(Link).at(0).children().text()).toBe('Cards');
    expect(app.find(Link).at(1).children().text()).toBe('Dice');
});


test('should have Routes to cards and dice', () => {
    const app = shallow(<App />);
    const routes = app.find(Route);
    expect(routes.at(0).props()).toMatchObject({ component: Cards });
    expect(routes.at(1).props()).toMatchObject({ component: Dice });
});
