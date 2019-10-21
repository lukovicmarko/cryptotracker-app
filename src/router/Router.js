import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../components/App';
import Details from '../components/Details';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/details/:id" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter