import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from '@serviceslabs/material-ui-pro';

import App from './component/App';
import { configureStore } from './store';


const app = (
    <Provider store={configureStore({})}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);


render(app, document.getElementById('app'));
