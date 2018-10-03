import * as React from 'react';
import { hot } from 'react-hot-loader';

import classNames from 'classnames';

import { StandardProps } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import { colors } from '@serviceslabs/material-ui-pro';

import Content from './Content';
import Footer from './Footer';
import Header from './Header';


type ClassKey = 'root' | 'header' | 'content' | 'footer' | 'constrainedWidth';


interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
}


const styles = () => {
    const footerHeight = '3.75rem';

    return createStyles({
        '@global': { 'html, body, div#app': { height: '100%' } },
        root: {
            minHeight: '100%',
            position: 'relative'
        },
        header: { alignItems: 'center' },
        content: {
            paddingBottom: footerHeight,
            justifyContent: 'center'
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: footerHeight,
            backgroundColor: colors.grey[500],
            justifyContent: 'center'
        },
        constrainedWidth: {
            width: '100%',
            maxWidth: '50rem'
        }
    });
};


export default hot(module)(withStyles(styles)((
    { classes, className, ...other }: Props
) => {
    return (
        <div className={classNames(classes.root, className)} {...other}>
            <Header
                className={classes.header}
                classes={{
                    toolbar: classes.constrainedWidth,
                    tabs: classes.constrainedWidth
                }}
            />
            <Content
                className={classes.content}
                classes={{ content: classes.constrainedWidth }}
            />
            <Footer
                className={classes.footer}
                classes={{ content: classes.constrainedWidth }}
            />
        </div>
    );
}));
