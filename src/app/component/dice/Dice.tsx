import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from '../../store';
import { makeRemoteRoll } from '../../store/dice/thunks';
import { DiceRollRequest, DiceAction, DiceState } from '../../store/dice/types';
import Result from './Result';


const initialState = { sides: 4, number: 1 };
type State = DiceRollRequest;


interface DispatchProps {
    onSubmit: (rollParams: State) => void;
}


type Props = DispatchProps & DiceState;


class Dice extends React.Component<Props, State> {
    public readonly state: State = initialState;


    public componentDidMount() {
        const { current } = this.props;
        if (!current) return;
        this.setState(current.request);
    }


    public render() {
        const { isLoading, current, history } = this.props;

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
                <Result roll={current} isLoading={isLoading} />
                <h3>History:</h3>
                {history.map((roll, idx) => (
                    <div key={idx}>
                        <Result roll={roll} />
                        {idx + 1 !== history.length && <br />}
                    </div>
                ))}
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


function mapStateToProps({ dice }: ApplicationState): DiceState {
    return dice;
}


function mapDispatchToProps(
    dispatch: ThunkDispatch<ApplicationState, undefined, DiceAction>
): DispatchProps {
    return {
        onSubmit(rollParams: State) {
            dispatch(makeRemoteRoll(rollParams));
        }
    };
}


export default connect<DiceState, DispatchProps>(
    mapStateToProps, mapDispatchToProps
)(Dice);
