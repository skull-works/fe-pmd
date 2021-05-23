import React from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';

import authStore from '../store/store';

// pages
import Login from '../pages/login/login';
import Home from '../pages/home';
import Application from '../pages/application/application';
import Customer from '../pages/customer/customer';
import Reports from '../pages/reports/reports';

const authGuard = (Component, isAuthenticated) => () => {
    if (isAuthenticated)
        return <Component />;
    else
        return <Redirect to="/" />
}

const renderPublicComponent = (Component, isAuthenticated) => () => {
    if (isAuthenticated)
        return <Redirect to="/home" />;
    else
        return <Component />;
}

const Routes = () => {
    const isAuthenticated = authStore((state) => state.isAuthenticated);
    let location = useLocation();
    
    return (
        <Switch>
            {/* Public Routes     */}
            <Route exact path="/" render={renderPublicComponent(Login, isAuthenticated)}/>

            {/* Private Routes */}
            <Route path="/home" render={authGuard(Home, isAuthenticated)} />
            <Route path="/application" render={authGuard(Application, isAuthenticated)}/>
            <Route path="/customer" render={authGuard(Customer, isAuthenticated)}/>
            <Route path="/reports" render={authGuard(Reports, isAuthenticated)}/>

            {/* Fallback Routes */}
            <Route path="/notAuthenticated">
                <div className="mx-auto pt-30vh">
                    <h1 className="text-5xl"> 401 not authenticated, session may have timed out kindly login again!</h1>
                    <h2 className="text-3xl"> {location.state}</h2>
                    <p>click link to go back to <Link to="/" className="text-blue-600 underline">Login Page</Link></p>
                </div>
            </Route>

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