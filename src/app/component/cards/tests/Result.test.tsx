import * as React from 'react';

import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';

import Result from '../Result';


test('should display loading message when isLoading', () => {
    const result = shallow(<Result isLoading />).dive();
    const typography = result.find(Typography);
    expect(typography.children().text()).toBe('Drawing...');
});


test('should list all the cards for the draw', () => {
    const draw = { cards: ['1', '2', '3'], request: { decks: 1, number: 1 } };
    const result = shallow(<Result draw={draw} />).dive();
    const typography = result.find(Typography);

    draw.cards.forEach((val, idx) => (
        expect(typography.childAt(idx).text()).toMatch(val)
    ));
});


test('should show request for the draw', () => {
    const decks = 1;
    const number = 2;
    const draw = { cards: [], request: { decks, number } };
    const result = shallow(<Result draw={draw} />).dive();
    const typography = result.find(Typography).dive();
    expect(typography.dive().text()).toMatch(RegExp(`${number}.*${decks}`));
});


test('should display error message when only error', () => {
    const error = 'error message';
    const result = shallow(<Result error={error} />).dive();
    const typography = result.find(Typography).dive();
    expect(typography.dive().text()).toContain(error);
});


test('should display nothing if no error, loading or draw', () => {
    const result = shallow(<Result />).dive();
    expect(result.children().length).toBe(0);
});
