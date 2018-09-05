import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './component/App';
import { configureStore } from './store';


const app = (
    <Provider store={configureStore({})}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);


render(app, document.getElementById('app'));
