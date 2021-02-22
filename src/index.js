import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import App from "./App.js";
import Deploy from './components/Deploy.js';
import history from './history';


render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/deployNewProcess' component={Deploy} />
            <Route exact path='/' component={App} />
            <Route exact path='/' component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
