import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { shallow } from 'enzyme';

import config from '../../config';

import Cards from '../cards/Cards';
import Dice from '../dice/Dice';

import Content from '../Content';


const cardsPath = config.paths.cards;
const dicePath = config.paths.dice;


test('should redirect / to cards', () => {
    const content = shallow(<Content />).dive();
    const redirectRoute = content.find(Route).at(0);
    const props = redirectRoute.props();

    expect(props).toMatchObject({
        exact: true,
        path: '/',
        render: expect.any(Function)
    });

    expect(props.render()).toMatchObject(<Redirect to={cardsPath} />);
});


test('should contain cards route', () => {
    const content = shallow(<Content />).dive();
    const cardsRoute = content.find(Route).at(1);

    expect(cardsRoute.props()).toMatchObject({
        path: cardsPath,
        component: Cards
    });
});


test('should contain dice route', () => {
    const content = shallow(<Content />).dive();
    const diceRoute = content.find(Route).at(2);

    expect(diceRoute.props()).toMatchObject({
        path: dicePath,
        component: Dice
    });
});
