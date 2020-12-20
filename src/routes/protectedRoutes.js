import React from 'react';
import { Route, Link, Switch, useLocation } from 'react-router-dom';
//pages
import Home from '../pages/home';
import Application from '../pages/application/application';
import Customer from '../pages/customer/customer';
import Reports from '../pages/reports/reports';
//layouts
import Header from '../layout/header/header';

const ProtectedRoutes = () => {
    let location = useLocation();
    console.log(location);

    return(
        <Switch>
            <Route path="/home">
                <Header text="PMD PORTAL" title="PMD PORTAL" />
                <Home />
            </Route>
            <Route path="/application">
                <Application />
            </Route>
            <Route path="/customer">
                <Customer />
            </Route>
            <Route path="/reports">
                <Reports />
            </Route>


            <Route path="/notAuthenticated">
                <div className="mx-auto pt-30vh">
                    <h1 className="text-5xl"> 403 not authenticated to access page!</h1>
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

export default ProtectedRoutes;