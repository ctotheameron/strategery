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
    DiceDispatch, DiceRollRequest, DiceState
} from '../../store/dice/types';

import { ApplicationState } from '../../store';
import { rollRequest } from '../../store/dice/actions';

import Result from './Result';


type ClassKey = 'root' | 'resultLabel';
type State = DiceRollRequest;
type StateProps = DiceState;

interface DispatchProps {
    onFormSubmit: (rollParams: State) => void;
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
        paddingTop: 16
    }
});


export class Dice extends React.Component<Props, State> {
    public readonly state: State = { sides: 4, number: 1 };


    public componentDidMount() {
        const { current } = this.props;
        if (!current) return;
        this.setState(current.request);
    }


    public render() {
        const {
            classes, className, isLoading, current, history, error, ...other
        } = this.props;

        return (
            <div className={classNames(classes.root, className)} {...other}>
                <Typography variant="title">Roll Some Dice</Typography>
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
                        id="kind-select"
                        select
                        label="Kind"
                        value={String(this.state.sides)}
                        onChange={this.handleSidesChange}
                        SelectProps={{ native: true }}
                        variant="filled"
                        margin="normal"
                    >
                        <option value="4">d4</option>
                        <option value="6">d6</option>
                        <option value="8">d8</option>
                        <option value="10">d10</option>
                        <option value="12">d12</option>
                        <option value="20">d20</option>
                        <option value="100">d100</option>
                    </TextField>
                    <br />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        Roll
                    </Button>
                </form>
                <Typography
                    className={classes.resultLabel}
                    variant="subheading"
                >
                    Result:
                </Typography>
                <span id="roll-result">
                    <Result
                        roll={current}
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
                <span id="roll-history">
                    {history.map((roll, idx) => (
                        <span key={idx}>
                            <Result roll={roll} />
                            {idx + 1 !== history.length && <br />}
                        </span>
                    ))}
                </span>
            </div>
        );
    }


    private handleSidesChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        this.setState({ sides: Number(event.currentTarget.value) });
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


export function mapStateToProps({ dice }: ApplicationState): StateProps {
    return dice;
}


export function mapDispatchToProps(dispatch: DiceDispatch): DispatchProps {
    return {
        onFormSubmit(rollParams: State) {
            dispatch(rollRequest(rollParams));
        }
    };
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(Dice));
