import React from 'react';
import { toast } from 'react-toastify';

import { mockFetch } from '../test-util';
import AuthenticationController from '../../controllers/authentication';



beforeEach(() => {
    toast.error = jest.fn().mockImplementation(() => <h1> Mock toast </h1>);
});


afterEach(() => {
    jest.clearAllMocks();
});


describe('Authentication Controller', () => {
    let csrf = 'a&ASdij1@CSRFTOKENgenerated1231m2ko()S@sdm'

    describe('getCsrf Controller', () => {
        it('Success case retrieved an csrf token', async () => {
            mockFetch({csrfToken: csrf});
            let returnVal = await AuthenticationController.getCsrf();
            expect(returnVal).toEqual(csrf);
        })

        it('Failed case did not retrieved an csrf token', async () => {
            mockFetch({error: 'failed to generate csrf Token'});
            let returnVal = await AuthenticationController.getCsrf();
            expect(returnVal).toBeUndefined();
        })
    });

    describe('userLogin Controller', () => {
        it('Recieved an error property maybe due to Wrong credentials should call toast error', async () => {
            mockFetch({error: { message: 'wrong password' }});
            let returnVal = await AuthenticationController.userLogin('TestAdmin1', 'TestAdminPassword2', csrf);
            expect(returnVal).toBeFalsy();
        });

        it('Something went wrong or isLoggedIn is undefined should return undefined', async () => {
            mockFetch({ noErrorPropertyAndnoIsLoggedIn: 'noErrorPropertyAndnoIsLoggedIn'});
            let returnVal = await AuthenticationController.userLogin('TestAdmin1', 'TestAdminPassword2', csrf);
            expect(returnVal).toBeUndefined();
        });

        it('Successful Login should return true', async () => {
            mockFetch({isLoggedIn: true, message: 'Login successful'});
            let returnVal = await AuthenticationController.userLogin('TestAdmin1', 'TestAdminPassword2', csrf);
            expect(returnVal).toBeTruthy();
        });
    });

    describe('isStillLoggedIn Controller', () => {
        it('Recieved an Error maybe due to invalid token should return false', async () => {
            mockFetch({error: { message: 'Invalid token', statusCode: 403}});
            let returnVal = await AuthenticationController.isStillLoggedIn();
            expect(returnVal).toBeFalsy();
        });

        it('Something went wrong or isLoggedIn is undefined should return undefined', async () => {
            mockFetch({ noErrorPropertyAndnoIsLoggedIn: 'noErrorPropertyAndnoIsLoggedIn'});
            let returnVal = await AuthenticationController.isStillLoggedIn();
            expect(returnVal).toBeFalsy();
        });

        it('User is still logged in should return the proper data', async () => {
            mockFetch({csrfToken: csrf, isLoggedIn: true});
            let returnVal = await AuthenticationController.isStillLoggedIn();
            expect(returnVal).toEqual({csrfToken: csrf, isLoggedIn: true});
        });
    });

    describe('willLogout Controller', () => {

        it('Recieved warning should call toast error', async () => {
            let spyError = jest.spyOn(toast, 'error').mockImplementation(() => <h1> Mock toast </h1>);
            mockFetch({ warning: true, 
                message: 'Your account session has been tampered!, kindly login in another browser then log out from there' 
            });
            await AuthenticationController.willLogout();
            expect(spyError).toHaveBeenCalledTimes(1);
        });

        it('Recieved message only no logout property should call toast info', async () => {
            let spyInfo = jest.spyOn(toast, 'info').mockImplementation(() => <h1> Mock toast </h1>);
            mockFetch({ message: "User already logged out" });
            await AuthenticationController.willLogout();
            expect(spyInfo).toHaveBeenCalledTimes(1);
        });
        
        it('Recieved logout true and message should call toast success', async () => {
            let spySuccess = jest.spyOn(toast, 'success').mockImplementation(() => <h1> Mock toast </h1>);
            mockFetch({ logout: true, message: "User is logged out" });
            await AuthenticationController.willLogout();
            expect(spySuccess).toHaveBeenCalledTimes(1);
        });

    });
});