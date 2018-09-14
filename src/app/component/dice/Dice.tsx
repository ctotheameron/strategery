import * as React from 'react';
import { connect } from 'react-redux';

import {
    DiceRollRequest, DiceState, DiceDispatch
} from '../../store/dice/types';

import { rollRequest } from '../../store/dice/actions';
import { ApplicationState } from '../../store';

import Result from './Result';


type State = DiceRollRequest;
type StateProps = DiceState;

interface DispatchProps {
    onSubmit: (rollParams: State) => void;
}


export type Props = DispatchProps & StateProps;


export class Dice extends React.Component<Props, State> {
    public readonly state: State = { sides: 4, number: 1 };


    public componentDidMount() {
        const { current } = this.props;
        if (!current) return;
        this.setState(current.request);
    }


    public render() {
        const { isLoading, current, history, error } = this.props;

        return (
            <>
                <h2>Roll Some Dice</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Number:
                        <input
                            onChange={this.handleNumberChange}
                            type="number"
                            value={String(this.state.number)}
                            min={0}
                        />
                    </label>
                    <br />
                    <label>
                        Kind:
                        <select
                            onChange={this.handleSidesChange}
                            value={String(this.state.sides)}
                        >
                            <option value="4">d4</option>
                            <option value="6">d6</option>
                            <option value="8">d8</option>
                            <option value="10">d10</option>
                            <option value="12">d12</option>
                            <option value="20">d20</option>
                            <option value="100">d100</option>
                        </select>
                    </label>
                    <br />
                    <button disabled={isLoading} type="submit">Roll</button>
                </form>
                <h3>Result:</h3>
                    <span id="roll-result">
                        <Result
                            roll={current}
                            isLoading={isLoading}
                            error={error}
                        />
                    </span>
                <h3>History:</h3>
                <div id="roll-history">
                    {history.map((roll, idx) => (
                        <span key={idx}>
                            <Result roll={roll} />
                            {idx + 1 !== history.length && <br />}
                        </span>
                    ))}
                </div>
            </>
        );
    }


    private handleSidesChange = (
        event: React.FormEvent<HTMLSelectElement>
    ): void => {
        this.setState({ sides: Number(event.currentTarget.value) });
    }


    private handleNumberChange = (
        event: React.FormEvent<HTMLInputElement>
    ): void => {
        this.setState({ number: Number(event.currentTarget.value) });
    }


    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }
}


export function mapStateToProps({ dice }: ApplicationState): StateProps {
    return dice;
}


export function mapDispatchToProps(dispatch: DiceDispatch): DispatchProps {
    return {
        onSubmit(rollParams: State) {
            dispatch(rollRequest(rollParams));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Dice);
