import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route } from 'react-router-dom';

import Cards from './cards/Cards';
import Dice from './dice/Dice';


export default hot(module)(() => {
    return (
        <div>
            <h1>Do a thing with:</h1>
            <nav>
                <ul>
                    <li><Link to="/cards">Cards</Link></li>
                    <li><Link to="/dice">Dice</Link></li>
                </ul>
            </nav>
            <div>
                <Route path="/cards" component={Cards} />
                <Route path="/dice" component={Dice} />
            </div>
        </div>
    );
});
