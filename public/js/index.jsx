import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';


import LoginPage from './loginPage.jsx'

render(
    <Router>
        <Route path="/" component={LoginPage}/>
    </Router>,
    document.getElementById('app')
);

