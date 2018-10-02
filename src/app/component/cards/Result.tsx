import * as React from 'react';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';

import { CardsDraw } from '../../store/cards/types';


type ClassKey = 'root';

export interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
    draw?: CardsDraw;
    isLoading?: boolean;
    error?: string;
}


const styles = createStyles({
    root: {}
});


const Result = withStyles(styles)((
    { classes, className, draw, isLoading, error }: Props
) => {

    if (isLoading) {
        return (
            <Typography className={classNames(classes.root, className)}>
                Drawing...
            </Typography>
        );
    }

    if (draw) {
        const { request, cards } = draw;

        return (
            <Typography className={classNames(classes.root, className)}>
                {cards.map((c, i) => c + (i + 1 === cards.length ? '' : ', '))}
                {' '} (draw {request.number} from {request.decks} deck(s))
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
