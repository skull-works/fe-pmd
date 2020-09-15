import React from 'react';
import { act, fireEvent } from '@testing-library/react';

import { renderComp } from '../test-util';
import AuthenticationController from '../../controllers/authentication';
import Login from '../../pages/login/login';
import Home from '../../pages/home/index';
import Application from '../../pages/application/application';
import Customer from '../../pages/customer/customer';

jest.mock('../../controllers/authentication');

async function performComp(Component, Route, ReturnVal){
    AuthenticationController.isStillLoggedIn.mockResolvedValueOnce({isLoggedIn: ReturnVal});
    AuthenticationController.getCsrf.mockResolvedValueOnce('a&ASdij1@CSRFTOKENgenerated1231m2ko()S@sdm');
    AuthenticationController.userLogin.mockImplementation((username, password, csrf) => <h1>Mock Controller</h1>);
    AuthenticationController.willLogout.mockImplementation(() => <h1>Sample Logout</h1>);
    let results
    await act(async () => {
        results = await renderComp(Component, Route);
    });
    return results
}


afterEach(() => {
    jest.clearAllMocks();
});


describe('Login Page', () => {
    it('Login Page Elements and call isStillLoggedIn controller', async () => {
        await performComp(Login, '/', true);
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
        expect(AuthenticationController.getCsrf).toHaveBeenCalledTimes(0);
    });

    it('Login Page Elements thten call isStillLoggedIn and getCsrf controllers', async () => {
        const { getByText, getByLabelText } = await performComp(Login, '/', false);
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
        expect(AuthenticationController.getCsrf).toHaveBeenCalledTimes(1);
        getByText('SIGN IN'); getByText('PMD');
        getByLabelText("Username:");
        getByLabelText("Password:");
        getByText("Sign In");
    });

    it('Input username password then click Sign In', async () => {
        const { getByText, getByLabelText } = await performComp(Login, '/', false);
        
        fireEvent.change(getByLabelText("Username:"), { target: { value: 'TestAdmin'}});
        fireEvent.change(getByLabelText("Password:"), { target: { value: 'TestAdminPassword'}});
        fireEvent.click(getByText("Sign In"));

        expect(AuthenticationController.userLogin).toHaveBeenCalledTimes(1);
        expect(AuthenticationController.userLogin).toHaveBeenCalledWith('TestAdmin', 'TestAdminPassword', 'a&ASdij1@CSRFTOKENgenerated1231m2ko()S@sdm');
    });
});

describe('Other Pages test IsUserStillLoggedIn AuthHook', () => {
    it('Render Home Page should call isStillLoggedIn', async () => {
        await performComp(Home, '/home', true);
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
    });

    it('Render Application Page should call isStillLoggedIn', async () => {
        await performComp(Application, '/application', true);
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
    });
    
    it('Render Customer Page should call isStillLoggedIn', async () => {
        await performComp(Customer, '/customer', true);
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
    });
});

describe('Logout button', () => {
    it('Click Logout to logout from current session of logged in', async () => {
        let { getByText } = await performComp(Application, '/application', true);
        fireEvent.click(getByText("Logout"));
        expect(AuthenticationController.isStillLoggedIn).toHaveBeenCalledTimes(1);
        expect(AuthenticationController.willLogout).toHaveBeenCalledTimes(1);
    });
});