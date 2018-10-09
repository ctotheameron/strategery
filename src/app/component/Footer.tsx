import * as React from 'react';

import classNames from 'classnames';

import { createStyles, withStyles } from '@material-ui/core/styles';

import { StandardProps, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AppBarBottom from '@serviceslabs/material-ui-pro/AppBarBottom';
import blue from '@serviceslabs/material-ui-pro/colors/blue';


type ClassKey = 'root' | 'content' | 'button';


interface Props extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ClassKey
> {
    classes: ClassNameMap<ClassKey>;
}


const styles = ({ palette }: Theme) => {
    return createStyles({
        root: {
            paddingTop: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {},
        button: {
            color: blue[100],
            textTransform: 'none'
        }
    });
};


const FooterButton = withStyles(styles)(({ classes, children }: Props) => {
    return (
        <Button color="inherit">
            <Typography
                className={classes.button}
                variant="subtitle1"
                color="primary"
            >
                {children}
            </Typography>
        </Button>
    );
});


const Footer = withStyles(styles)(({ classes, className, ...other }: Props) => {
    return (
        <AppBarBottom
            position="static"
            color="primary"
            className={classNames(classes.root, className)}
        >
            <div className={classes.content}>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                >
                    © Pro.com, 2018
                </Typography>
                <>
                    <FooterButton>
                        Terms of Service
                    </FooterButton>
                    <FooterButton>
                        Privacy Policy
                    </FooterButton>
                </>
            </div>
        </AppBarBottom>
    );
});


export default Footer;
export { FooterButton };
