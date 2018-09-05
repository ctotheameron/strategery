import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    CardsDrawRequest, CardsAction, CardsState
} from '../../store/cards/types';

import { ApplicationState } from '../../store';
import { makeRemoteDraw } from '../../store/cards/thunks';
import Result from './Result';


const initialState = { decks: 1, number: 1 };
type State = CardsDrawRequest;


interface DispatchProps {
    onSubmit: (drawParams: State) => void;
}


type Props = DispatchProps & CardsState;


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
                <h2>Draw Some Cards</h2>
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
                        Decks:
                        <input
                            onChange={this.handleDecksChange}
                            type="number"
                            value={String(this.state.decks)}
                            min={0}
                        />
                    </label>
                    <br />
                    <button disabled={isLoading} type="submit">Draw</button>
                </form>
                <h3>Result:</h3>
                <Result draw={current} isLoading={isLoading} />
                <h3>History:</h3>
                {history.map((draw, idx) => (
                    <div key={idx}>
                        <Result draw={draw} />
                        {idx + 1 !== history.length && <br />}
                    </div>
                ))}
            </>
        );
    }


    private handleDecksChange = (
        event: React.FormEvent<HTMLInputElement>
    ): void => {
        this.setState({ decks: Number(event.currentTarget.value) });
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


function mapStateToProps({ cards }: ApplicationState): CardsState {
    return cards;
}


function mapDispatchToProps(
    dispatch: ThunkDispatch<ApplicationState, undefined, CardsAction>
): DispatchProps {
    return {
        onSubmit(drawParams: State) {
            dispatch(makeRemoteDraw(drawParams));
        }
    };
}


export default connect<CardsState, DispatchProps>(
    mapStateToProps, mapDispatchToProps
)(Dice);
