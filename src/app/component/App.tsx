import * as React from 'react';
import { hot } from 'react-hot-loader';

import classNames from 'classnames';

import { StandardProps, Theme } from '@material-ui/core';
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


const styles = ({ palette }: Theme) => {
    const footerHeight = '3.75rem';
    const defaultMaxW = '50rem';

    const safeW = 'calc('
                + '100% - env(safe-area-inset-right) '
                + '- env(safe-area-inset-left))';

    const safeFooterPadding = 'env(safe-area-inset-bottom)';
    const safeFooterH = `calc(${footerHeight} + ${safeFooterPadding})`;

    return createStyles({
        '@global': {
            'html, body, div#app': { height: '100%' },
            body: { backgroundColor: palette.primary.main }
        },
        root: {
            minHeight: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        },
        header: { alignItems: 'center' },
        content: {
            flexGrow: 1,
            justifyContent: 'center'
        },
        footer: {
            minHeight: safeFooterH,
            backgroundColor: colors.grey[500],
            justifyContent: 'center',
            paddingBottom: safeFooterPadding
        },
        constrainedWidth: {
            width: '100%',
            maxWidth: defaultMaxW,
            '@supports(max-width: max(0px))': {
                maxWidth: `min(${defaultMaxW}, ${safeW})`
            }
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
