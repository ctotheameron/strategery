import * as React from 'react';
import { shallow } from 'enzyme';

import { ApplicationState } from '../../../store';
import { Cards, Props, mapStateToProps, mapDispatchToProps } from '../Cards';
import Result from '../Result';
import { makeRemoteDraw } from '../../../store/cards/thunks';


jest.mock('../../../store/cards/thunks', () => ({
    makeRemoteDraw: jest.fn(params => `makeRemoteDraw${params}`)
}));


beforeEach(jest.clearAllMocks);


describe('<Cards />', () => {
    const defaultProps: Props = {
        isLoading: false,
        history: [],
        onSubmit: jest.fn()
    };


    test('should seed state with most recent current request params', () => {
        const props: Props = {
            ...defaultProps,
            current: { cards: [], request: { number: 2, decks: 2 } }
        };

        const cards = shallow(<Cards {...props} />);
        expect(cards.state()).toMatchObject(props.current.request);
    });


    test('should update state when number input changes', () => {
        const cards = shallow(<Cards {...defaultProps} />);
        const numberInput = cards.find('input').at(0);

        const value = 2;
        numberInput.simulate('change', { currentTarget: { value } });
        expect(cards.state('number')).toBe(value);
    });


    test('should update state when decks input changes', () => {
        const cards = shallow(<Cards {...defaultProps} />);
        const decksInput = cards.find('input').at(1);

        const value = 2;
        decksInput.simulate('change', { currentTarget: { value } });
        expect(cards.state('decks')).toBe(value);
    });


    test('should call onSubmit when form is submitted', () => {
        const cards = shallow(<Cards {...defaultProps} />);
        const form = cards.find('form');
        const preventDefault = jest.fn();
        form.simulate('submit', { preventDefault });
        expect(preventDefault).toBeCalled();
        expect(defaultProps.onSubmit).toBeCalledWith(cards.state());
    });


    test('should render result of current draw', () => {
        const props: Props = {
            ...defaultProps,
            current: { cards: [], request: { number: 2, decks: 2 } },
            error: 'error'
        };

        const cards = shallow(<Cards {...props} />);
        const result = cards.find(Result);

        expect(result.props()).toMatchObject({
            draw: props.current,
            isLoading: props.isLoading,
            error: props.error
        });
    });


    test('should render result history list', () => {
        const props: Props = {
            ...defaultProps,
            history: [
                { cards: [], request: { number: 1, decks: 1 } },
                { cards: [], request: { number: 2, decks: 2 } },
                { cards: [], request: { number: 3, decks: 3 } }
            ]
        };

        const cards = shallow(<Cards {...props} />);
        const result = cards.find(Result);

        props.history.forEach((draw, idx) => {
            expect(result.at(idx + 1).props()).toMatchObject({ draw });
        });
    });
});


describe('mapStateToProps', () => {
    test('should proxy ApplicationState.cards', () => {
        const state: ApplicationState = {
            cards: { isLoading: true, history: [] },
            dice: { isLoading: false, history: [] }
        };

        expect(mapStateToProps(state)).toMatchObject(state.cards);
    });
});


describe('mapDispatchToProps', () => {
    test('should expose onSubmit function', () => {
        const dispatch = jest.fn();
        const { onSubmit } = mapDispatchToProps(dispatch);

        const drawParams = { number: 1, decks: 2 };
        onSubmit(drawParams);

        expect(dispatch).toBeCalledWith(makeRemoteDraw(drawParams));
    });
});
