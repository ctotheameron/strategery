import * as React from 'react';
import { StaticContext } from 'react-router';

import {
    Link, LinkProps, RouteComponentProps, withRouter
} from 'react-router-dom';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';

import ProcomLogo from '@serviceslabs/material-ui-pro/icons/ProcomLogo';

import config from '../config';


const cardsPath = config.paths.cards;
const dicePath = config.paths.dice;


type ClassKey = 'root' | 'toolbar' | 'tabs';


interface Props extends StandardProps<
    React.HTMLAttributes<HTMLHeadElement>,
    ClassKey
>, RouteComponentProps<any, StaticContext, any> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
}


const styles = createStyles({
    root: {},
    toolbar: {},
    tabs: {}
});


const CardsLink = ({ innerRef, ...props }: ButtonBaseProps) => (
    <Link {...props as LinkProps} to={cardsPath} />
);


const DiceLink = ({ innerRef, ...props }: ButtonBaseProps) => (
    <Link {...props as LinkProps} to={dicePath} />
);


function tabValue(pathname: string) {
    return [cardsPath, dicePath].includes(pathname) ? pathname : cardsPath;
}


const Header = withStyles(styles)(withRouter((
    { classes, className, location }: Props
) => {
    return (
        <AppBar
            position="static"
            color="primary"
            className={classNames(classes.root, className)}
        >
            <Toolbar className={classes.toolbar}>
                <ProcomLogo style={{ fontSize: '3.5rem' }} />
            </Toolbar>
            <Tabs
                className={classes.tabs}
                value={tabValue(location.pathname)}
            >
                <Tab
                    label="Cards"
                    component={CardsLink}
                    value={cardsPath}
                />
                <Tab
                    label="Dice"
                    component={DiceLink}
                    value={dicePath}
                />
            </Tabs>
        </AppBar>
    );
}));


export default Header;
