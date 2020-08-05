import React from 'react';
import { render } from '@testing-library/react'
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Routes from '../routes/main';



exports.renderWith = (route) => {
    const history = createMemoryHistory();
    history.push(route);
    const renderComponent = render(
        <Router history={history}>
            <Routes />
        </Router>
    );
    renderComponent.history = history;
    return renderComponent;
};