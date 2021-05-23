import React from 'react';
import { Route, Link, Switch, useLocation, Redirect } from 'react-router-dom';
//pages
import Routes from './main';
import Home from '../pages/home';
import Application from '../pages/application/application';
import Customer from '../pages/customer/customer';
import Reports from '../pages/reports/reports';

const authGuard = (Component) => () => {
    if (localStorage.getItem("IsAuthenticated") === 'true')
        return <Component />;
    else
        return <Redirect to="/" />
}

const ProtectedRoutes = () => {
    let location = useLocation();

    return(
        <Routes>
            <Route path="/home" render={authGuard(Home)} />
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
                    <h1 className="text-5xl"> 401 not authenticated to access page!</h1>
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
        </Routes>
    )
}

export default ProtectedRoutes;