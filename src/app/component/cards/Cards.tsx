import * as React from 'react';
import { connect } from 'react-redux';

import {
    CardsDrawRequest, CardsDispatch, CardsState
} from '../../store/cards/types';

import { ApplicationState } from '../../store';
import Result from './Result';
import { drawRequest } from '../../store/cards/actions';


type State = CardsDrawRequest;
type StateProps = CardsState;

interface DispatchProps {
    onSubmit: (drawParams: State) => void;
}


export type Props = DispatchProps & StateProps;


export class Cards extends React.Component<Props, State> {
    public readonly state: State = { decks: 1, number: 1 };


    public componentDidMount() {
        const { current } = this.props;
        if (!current) return;
        this.setState(current.request);
    }


    public render() {
        const { isLoading, current, history, error } = this.props;

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
                <Result draw={current} isLoading={isLoading} error={error} />
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


export function mapStateToProps({ cards }: ApplicationState): StateProps {
    return cards;
}


export function mapDispatchToProps(dispatch: CardsDispatch): DispatchProps {
    return {
        onSubmit: (drawParams: State) => dispatch(drawRequest(drawParams))
    };
}


export default connect<StateProps, DispatchProps>(
    mapStateToProps, mapDispatchToProps
)(Cards);