import * as React from 'react';

import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';

import Result from '../Result';


test('should display loading message when isLoading', () => {
    const result = shallow(<Result isLoading />).dive();
    const typography = result.find(Typography);
    expect(typography.children().text()).toBe('Rolling...');
});


test('should show sum for the roll', () => {
    const sum = 1;
    const roll = { sum, rolls: [], request: { sides: 0, number: 1 } };
    const result = shallow(<Result roll={roll} />).dive();
    const typography = result.find(Typography);
    expect(typography.childAt(0).text()).toMatch(RegExp(`${sum}`));
});


test('should show request for the roll', () => {
    const sides = 1;
    const number = 2;
    const roll = { sum: 0, rolls: [], request: { sides, number } };
    const result = shallow(<Result roll={roll} />).dive();
    const typography = result.find(Typography).dive();
    expect(typography.dive().text()).toMatch(RegExp(`${number}.*${sides}`));
});


test('should list all the rolls for the roll', () => {
    const roll = { sum: 6, rolls: [1, 2, 3], request: { sides: 3, number: 3 } };
    const result = shallow(<Result roll={roll} />).dive();
    const typography = result.find(Typography).dive();

    roll.rolls.forEach((val, idx) => {
        expect(typography.childAt(idx + 8).text()).toMatch(`${val}`);
    });
});


test('should display error message when only error', () => {
    const error = 'error message';
    const result = shallow(<Result error={error} />).dive();
    const typography = result.find(Typography).dive();
    expect(typography.dive().text()).toContain(error);
});


test('should display nothing if no error, loading or roll', () => {
    const result = shallow(<Result />).dive();
    expect(result.children().length).toBe(0);
});
