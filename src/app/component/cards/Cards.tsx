import * as React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {
    CardsDispatch, CardsDrawRequest, CardsState
} from '../../store/cards/types';

import { ApplicationState } from '../../store';
import { drawRequest } from '../../store/cards/actions';
import Result from './Result';


type ClassKey = 'root' | 'resultLabel';
type State = CardsDrawRequest;
type StateProps = CardsState;

interface DispatchProps {
    onFormSubmit: (drawParams: State) => void;
}


export interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
>, DispatchProps, StateProps {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
}


const styles = createStyles({
    root: {},
    resultLabel: {
        paddingTop: '1rem'
    }
});


export class Cards extends React.Component<Props, State> {
    public readonly state: State = { decks: 1, number: 1 };


    public componentDidMount() {
        const { current } = this.props;
        if (!current) return;
        this.setState(current.request);
    }


    public render() {
        const {
            classes, className, isLoading, current, history, error
        } = this.props;

        return (
            <div className={classNames(classes.root, className)}>
                <Typography variant="title">Draw Some Cards</Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="number-input"
                        label="Number"
                        value={String(this.state.number)}
                        onChange={this.handleNumberChange}
                        type="number"
                        inputProps={{ min: '0' }}
                        variant="filled"
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="decks-input"
                        label="Decks"
                        value={String(this.state.decks)}
                        onChange={this.handleDecksChange}
                        type="number"
                        inputProps={{ min: '0' }}
                        variant="filled"
                        margin="normal"
                    />
                    <br />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        Draw
                    </Button>
                </form>
                <Typography
                    className={classes.resultLabel}
                    variant="subheading"
                >
                    Result:
                </Typography>
                <span id="draw-result">
                    <Result
                        draw={current}
                        isLoading={isLoading}
                        error={error}
                    />
                </span>
                <Typography
                    className={classes.resultLabel}
                    variant="subheading"
                >
                    History:
                </Typography>
                <span id="draw-history">
                    {history.map((draw, idx) => (
                        <span key={idx}>
                            <Result draw={draw} />
                            {idx + 1 !== history.length && <br />}
                        </span>
                    ))}
                </span>
            </div>
        );
    }


    private handleDecksChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        this.setState({ decks: Number(event.currentTarget.value) });
    }


    private handleNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        this.setState({ number: Number(event.currentTarget.value) });
    }


    private handleSubmit = (
        event: React.ChangeEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
    }
}


export function mapStateToProps({ cards }: ApplicationState): StateProps {
    return cards;
}


export function mapDispatchToProps(dispatch: CardsDispatch): DispatchProps {
    return {
        onFormSubmit: (drawParams: State) => dispatch(drawRequest(drawParams))
    };
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(Cards));
