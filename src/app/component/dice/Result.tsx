import * as React from 'react';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';

import { DiceRoll } from '../../store/dice/types';


type ClassKey = 'root';

export interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
    roll?: DiceRoll;
    isLoading?: boolean;
    error?: string;
}


const styles = createStyles({
    root: {}
});


const Result = withStyles(styles)((
    { classes, className, roll, isLoading, error }: Props
) => {
    if (isLoading) {
        return (
            <Typography className={classNames(classes.root, className)}>
                Rolling...
            </Typography>
        );
    }

    if (roll) {
        const { request, rolls, sum } = roll;

        return (
            <Typography className={classNames(classes.root, className)}>
                <b>{sum}</b>
                {' '}
                (
                {request.number}d{request.sides}:
                {' '}
                {rolls.map((r, i) => r + (i + 1 === rolls.length ? '' : ', '))}
                )
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography
                className={classNames(classes.root, className)}
                color="error"
            >
                Error: {error}
            </Typography>
        );
    }

    return <></>;
});


export default Result;
