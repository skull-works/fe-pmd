import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
//pages
import Home from '../pages/home';
import Application from '../pages/application/application';
import Customer from '../pages/customer/customer';
//layouts
import Header from '../layout/header/header';

const ProtectedRoutes = () => {
    return(
        <Fragment>
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
            <Route path="/notAuthenticated">
                <div className="mx-auto pt-30vh">
                    <h1 className="text-5xl"> 403 not authenticated to access page!</h1>
                    <p>click link to go back to <Link to="/" className="text-blue-600 underline">Login Page</Link></p>
                </div>
            </Route>
        </Fragment>
    )
}

export default ProtectedRoutes;