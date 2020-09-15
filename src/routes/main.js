import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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

             <Route path="*">
                 <div className="mx-auto pt-30vh">
                    <h1 className="text-5xl"> 404 Page not found :-(</h1>
                    <p>click link to go back to <Link to="/" className="text-blue-600 underline">Default Page</Link></p>
                 </div>
             </Route>
        </Switch>
    )
}

export default Routes;