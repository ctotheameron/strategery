import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import config from '../config';

import Cards from './cards/Cards';
import Dice from './dice/Dice';


type ClassKey = 'root' | 'content';

interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
}


const cardsPath = config.paths.cards;
const dicePath = config.paths.dice;

const styles = createStyles({
    root: { display: 'flex' },
    content: { padding: '1rem' }
});


function redirectToCards() {
    return <Redirect to={cardsPath} />;
}


const Content = withStyles(styles)((
    { classes, className, ...other }: Props
) => {
    return (
        <div className={classNames(classes.root, className)} {...other}>
            <div className={classes.content}>
                <Switch>
                    <Route exact path="/" render={redirectToCards} />
                    <Route path={cardsPath} component={Cards} />
                    <Route path={dicePath} component={Dice} />
                </Switch>
            </div>
        </div>
    );
});


export default Content;
