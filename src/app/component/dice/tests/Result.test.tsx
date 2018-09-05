import * as React from 'react';
import { shallow } from 'enzyme';

import Result, { Props } from '../Result';


test('should display loading message when isLoading', () => {
    const props: Props = { isLoading: true };
    const result = shallow(<Result {...props} />);
    expect(result.children().text()).toBe('Rolling...');
});


test('should show sum for the roll', () => {
    const sum = 1;
    const props: Props = {
        roll: { sum, rolls: [], request: { sides: 0, number: 1 } }
    };

    const result = shallow(<Result {...props} />);
    expect(result.childAt(0).text()).toMatch(RegExp(`${sum}`));
});


test('should show request for the roll', () => {
    const sides = 1;
    const number = 2;
    const props: Props = {
        roll: { sum: 0, rolls: [], request: { sides, number } }
    };

    const result = shallow(<Result {...props} />);
    expect(result.text()).toMatch(RegExp(`${number}.*${sides}`));
});


test('should list all the rolls for the roll', () => {
    const props: Props = {
        roll: {
            sum: 6,
            rolls: [1, 2, 3],
            request: { sides: 3, number: 3 }
        }
    };

    const result = shallow(<Result {...props} />);
    props.roll.rolls.forEach((val, idx) => {
        expect(result.childAt(idx + 8).text()).toMatch(`${val}`);
    });
});


test('should display error message when only error', () => {
    const props: Props = { error: 'error message' };
    const result = shallow(<Result {...props} />);
    expect(result.children().at(1).text()).toBe(props.error);
});


test('should display nothing if no error, loading or roll', () => {
    const props: Props = {};
    const result = shallow(<Result {...props} />);
    expect(result.children().length).toBe(0);
});
