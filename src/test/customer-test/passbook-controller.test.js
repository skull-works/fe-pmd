import React from 'react';
import { toast } from 'react-toastify';
import { cleanup } from '@testing-library/react'; 

import PassbookController from '../../controllers/passbook';
import { mockFetch, renderHook, perform } from '../test-util';
import data from './data/post-passbook';
import { Hooks } from '../../pages/customer/content/passbook/hooks';

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
})

describe('Passbook Controller Cases', () => {
    describe('Post' , () => {
        describe('post passbook', () => {
            it('create passbook successful', async () => {
                const spyToast = jest.spyOn(toast, 'success').mockImplementation(() => <h1>MocktoastSuccess</h1>);
                const spyApi = jest.spyOn(PassbookController, 'postPassbook');
                
                mockFetch(data.postPassbookSuccess);
                await PassbookController.postPassbook('test-01', 5);

                expect(spyToast).toHaveBeenCalledTimes(1);
                expect(spyApi).toHaveBeenCalledTimes(1);
                expect(spyApi).toHaveBeenCalledWith('test-01', 5);
            });

            it('create passbook error', async () => {  //should error when creating the same passbook for an application
                const spyToast = jest.spyOn(toast, 'error').mockImplementation(() => <h1>MocktoastError</h1>);
                const spyApi = jest.spyOn(PassbookController, 'postPassbook');

                mockFetch(data.postPassbookError);
                await PassbookController.postPassbook('test-01', 5);

                expect(spyToast).toHaveBeenCalledTimes(1);
                expect(spyApi).toHaveBeenCalledTimes(1);
                expect(spyApi).toHaveBeenCalledWith('test-01', 5);
            });
        });

        describe('post passbookItems', () => {
            it('successful should return success message', async () => {
                const spyToast = jest.spyOn(toast, 'success');
                const spypostPassbookItem = jest.spyOn(PassbookController, 'postPassbookItem');
                mockFetch(data.postPassbookItemSuccess);
                await PassbookController.postPassbookItem({passbookId:1, balance: 3000, collection: 200});
                
                expect(spypostPassbookItem).toHaveBeenCalledTimes(1);
                expect(spyToast).toHaveBeenCalledTimes(1);
            });

            it('error should call toast.error', async () => {
                const spyToast = jest.spyOn(toast, 'error');
                const spypostPassbookItem = jest.spyOn(PassbookController, 'postPassbookItem');
                mockFetch(data.postPassbookItemError);
                await PassbookController.postPassbookItem({passbookId:1, balance: 3000, collection: 200});
                
                expect(spypostPassbookItem).toHaveBeenCalledTimes(1);
                expect(spyToast).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('Get', () =>{
        it('getPassbookItems successfuly', async () => {
            const results = renderHook(Hooks);
            const spyApi = jest.spyOn(PassbookController, 'getPassbookItems');

            mockFetch(data.getPassbookItems);
            await perform(PassbookController.getPassbookItems,[{formId:1}, results.setTableData, results.setCustomerInfo], true);

            //assertions
            expect(spyApi).toHaveBeenCalledTimes(1);
            expect(spyApi).toHaveBeenCalledWith({formId:1}, results.setTableData, results.setCustomerInfo);
            expect(results.customerInfo).toHaveProperty('pay_type');   // hooks used in passbook page for customer information
            expect(results.customerInfo).toHaveProperty('customer');   // hooks used in passbook page for customer information
            expect(results.customerInfo).toHaveProperty('passbook');   // hooks used in passbook page for customer information
            expect(results.tableData.length).toEqual(2);               // hooks used in passbook page for payments record under table
        });

        it('getPassbookItems but no passbook retrieved should call toast error', async () => {
            const spyToast = jest.spyOn(toast, 'error').mockImplementation(() => <h1>MocktoastError</h1>);
            const results = renderHook(Hooks);
            const spyApi = jest.spyOn(PassbookController, 'getPassbookItems');

            mockFetch(data.postPassbookError);
            await perform(PassbookController.getPassbookItems,[{formId:1}, results.setTableData, results.setCustomerInfo], true);

            expect(spyToast).toHaveBeenCalledTimes(1);
            expect(spyApi).toHaveBeenCalledTimes(1);
            expect(spyApi).toHaveBeenCalledWith({formId:1}, results.setTableData, results.setCustomerInfo);
        });
    });
});