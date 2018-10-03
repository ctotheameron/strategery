import * as React from 'react';

import classNames from 'classnames';

import { createStyles, withStyles } from '@material-ui/core/styles';

import { StandardProps, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';


type ClassKey = 'root' | 'content' | 'label';


interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    // TODO: See if there is a better way to force classes to be defined
    classes: ClassNameMap<ClassKey>;
}


const styles = ({ palette }: Theme) => {
    return createStyles({
        root: {
            height: '100%',
            display: 'flex'
        },
        content: { paddingTop: '1.125rem' },
        label: {
            color: palette.common.white,
            textAlign: 'center'
        }
    });
};


const Footer = withStyles(styles)(({ classes, className, ...other }: Props) => {
    return (
        <footer className={classNames(classes.root, className)} {...other}>
            <div className={classes.content}>
                <Typography color="inherit" className={classes.label}>
                    What a great website!
                </Typography>
            </div>
        </footer>
    );
});


export default Footer;
