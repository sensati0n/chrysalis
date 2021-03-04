import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import App from "./App.js";
import Configure from './components/Configure.js';
import Deploy from './components/Deploy.js';
import Processes from './components/Processes.js';
import Web3Info from './components/Web3Info.js';
import Accounts from './components/Accounts.js';
import history from './history';

render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/deployNewProcess' component={Deploy} />
            <Route exact path='/processes' component={Processes} />
            <Route exact path='/configure' component={Configure} />
            <Route exact path='/web3' component={Web3Info} />
            <Route exact path='/accounts' component={Accounts} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
