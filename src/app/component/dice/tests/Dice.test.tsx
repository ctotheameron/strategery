import * as React from 'react';
import { shallow } from 'enzyme';

import { ApplicationState } from '../../../store';
import { rollRequest } from '../../../store/dice/actions';

import { Dice, Props, mapStateToProps, mapDispatchToProps } from '../Dice';
import Result from '../Result';


beforeEach(jest.clearAllMocks);


describe('<Dice />', () => {
    const defaultProps: Props = {
        isLoading: false,
        history: [],
        onSubmit: jest.fn()
    };


    test('should seed state with most recent current request params', () => {
        const props: Props = {
            ...defaultProps,
            current: { sum: 2, rolls: [], request: { number: 2, sides: 2 } }
        };

        const dice = shallow(<Dice {...props} />);
        expect(dice.state()).toMatchObject(props.current.request);
    });


    test('should update state when number input changes', () => {
        const dice = shallow(<Dice {...defaultProps} />);
        const numberInput = dice.find('input').at(0);

        const value = 2;
        numberInput.simulate('change', { currentTarget: { value } });
        expect(dice.state('number')).toBe(value);
    });


    test('should update state when kind select changes', () => {
        const dice = shallow(<Dice {...defaultProps} />);
        const kindInput = dice.find('select').at(0);

        const value = 2;
        kindInput.simulate('change', { currentTarget: { value } });
        expect(dice.state('sides')).toBe(value);
    });


    test('should call onSubmit when form is submitted', () => {
        const dice = shallow(<Dice {...defaultProps} />);
        const form = dice.find('form');
        const preventDefault = jest.fn();
        form.simulate('submit', { preventDefault });
        expect(preventDefault).toBeCalled();
        expect(defaultProps.onSubmit).toBeCalledWith(dice.state());
    });


    test('should render result of current roll', () => {
        const props: Props = {
            ...defaultProps,
            current: { sum: 2, rolls: [], request: { number: 2, sides: 2 } },
            error: 'error'
        };

        const dice = shallow(<Dice {...props} />);
        const result = dice.find(Result);

        expect(result.props()).toMatchObject({
            roll: props.current,
            isLoading: props.isLoading,
            error: props.error
        });
    });


    test('should render result history list', () => {
        const props: Props = {
            ...defaultProps,
            history: [
                { sum: 1, rolls: [], request: { number: 1, sides: 1 } },
                { sum: 2, rolls: [], request: { number: 2, sides: 2 } },
                { sum: 3, rolls: [], request: { number: 3, sides: 3 } }
            ]
        };

        const dice = shallow(<Dice {...props} />);
        const result = dice.find(Result);

        props.history.forEach((roll, idx) => {
            expect(result.at(idx + 1).props()).toMatchObject({ roll });
        });
    });
});


describe('mapStateToProps', () => {
    test('should proxy ApplicationState.dice', () => {
        const state: ApplicationState = {
            cards: { isLoading: true, history: [] },
            dice: { isLoading: false, history: [] }
        };

        expect(mapStateToProps(state)).toMatchObject(state.dice);
    });
});


describe('mapDispatchToProps', () => {
    test('should expose onSubmit function', () => {
        const dispatch = jest.fn();
        const { onSubmit } = mapDispatchToProps(dispatch);

        const rollParams = { number: 1, sides: 2 };
        onSubmit(rollParams);

        expect(dispatch).toBeCalledWith(rollRequest(rollParams));
    });
});
