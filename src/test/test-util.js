/* eslint-disable no-unused-expressions */
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Route } from 'react-router-dom';
import Routes from '../routes/main';

const mockFetch = (data) => {
    global.fetch = jest.fn().mockImplementation(() => {
        1 + 1
        return Promise.resolve({
            json: () => Promise.resolve(data)
        })
    })
}

const mockFetch2 = (data) => {
    global.fetch = jest.fn().mockImplementation(() => {
        1 + 1
        return data
    })
}


const renderWith = (route) => {
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


const renderComp = (Component, route) => {
    const history = createMemoryHistory();
    history.push(route);
    const renderComponent = render(
        <Router history={history}>
            <Route path="*">
                <Component />
            </Route>
        </Router>
    );
    renderComponent.history = history;
    return renderComponent;
};


const renderHook = (Hooks) => {
    const results = {};
    const WrapperHook = () => {
        let val = Hooks();
        Object.assign(results, val);
        return null;
    }
    render(<WrapperHook />);
    return results;
}

const perform = async (cb, args, type) => {
    if(!type){
        act(() => {
            cb(...args);
        })
    }
    else{
       return await act( async () => {
            await cb(...args);
        })
    }
}

const loopInputs = (arrLabel, arrValue, arrField, getByLabelText, spy) => {
    let i = 0;
    arrLabel.forEach(label => {
        fireEvent.change(getByLabelText(label), { target:{ value: arrValue[i] }});

        expect(spy.mock.calls[i][0]).toBe(arrField[i]);
        expect(spy.mock.calls[i][1]).toBe(arrValue[i]);
        ++i;
    });
}

module.exports = {
    renderWith,
    renderComp,
    renderHook,
    perform,
    loopInputs,
    mockFetch,
    mockFetch2
}