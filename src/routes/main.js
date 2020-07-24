import React from 'react';
import { Switch, Route } from 'react-router-dom';
//pages
import Home from '../pages/home';
import Application from '../pages/application/application';
import Login from '../pages/login/login';
//layouts
import Header from '../layout/header/header';

const Routes = () => {
    return (
        <Switch>    
             <Route exact path="/"  >
                 <Login />
             </Route>
             <Route path="/home">
                 <Header text="PMD PORTAL" title="PMD PORTAL" />
                 <Home />
             </Route>
             <Route path="/application" component={Application} />
        </Switch>
    )
}

export default Routes;