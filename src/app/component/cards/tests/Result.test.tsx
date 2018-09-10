import * as React from 'react';
import { shallow } from 'enzyme';

import Result, { Props } from '../Result';


test('should display loading message when isLoading', () => {
    const props: Props = { isLoading: true };
    const result = shallow(<Result {...props} />);
    expect(result.children().text()).toBe('Drawing...');
});


test('should list all the cards for the draw', () => {
    const draw = {
        cards: ['1', '2', '3'],
        request: { decks: 1, number: 1 }
    };

    const result = shallow(<Result draw={draw} />);
    draw.cards.forEach((val, idx) => {
        expect(result.childAt(idx).text()).toMatch(val);
    });
});


test('should show request for the draw', () => {
    const decks = 1;
    const number = 2;
    const props: Props = { draw: { cards: [], request: { decks, number } } };

    const result = shallow(<Result {...props} />);
    expect(result.text()).toMatch(RegExp(`${number}.*${decks}`));
});


test('should display error message when only error', () => {
    const props: Props = { error: 'error message' };
    const result = shallow(<Result {...props} />);
    expect(result.children().at(1).text()).toBe(props.error);
});


test('should display nothing if no error, loading or draw', () => {
    const props: Props = {};
    const result = shallow(<Result {...props} />);
    expect(result.children().length).toBe(0);
});
