import React from 'react';
import { Switch, Route } from 'react-router-dom';
//pages
import Login from '../pages/login/login';
import ProtectedRoutes from './protectedRoutes';

const Routes = () => {
    return (
        <Switch>    
             <Route exact path="/"  >
                 <Login />
             </Route>

             <ProtectedRoutes />
        </Switch>
    )
}

export default Routes;