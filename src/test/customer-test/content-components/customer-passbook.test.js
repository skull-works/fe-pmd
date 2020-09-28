import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { toast } from 'react-toastify';

import { perform, mockFetch, renderComp } from '../../test-util';
import data from '../data/post-passbook';
import Passbook from '../../../pages/customer/content/passbook/passbook';
import Dialog from '../../../elements/dialog';
import PassbookController from '../../../controllers/passbook';
import AuthenticationController from '../../../controllers/authentication';

jest.mock('../../../controllers/authentication');

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
})


async function performComp(Component, Route){
    AuthenticationController.isStillLoggedIn.mockResolvedValueOnce({isLoggedIn: true});
    let results
    await act(async () => {
        results = await renderComp(Component, Route);
    });
    return results
}


describe('Passbook Component', () => {
    describe('Elements inside Passbook Component', () => {
        it('showInputs Button and tables' , async () => {
            const { getByTestId, getByText } = await performComp(Passbook, '/customer');
            //assertions
            getByTestId("showInputs-button")
            getByTestId("passbookItems");
            getByText("No Payments Found");
        });

        it('Filter Inputs', async () => {
            const { getByTestId, getByLabelText, getByText } = await performComp(Passbook, '/customer');
            //click button to show inputs
            perform(fireEvent.click,[getByTestId("showInputs-button")]);
            //assertion show inputs
            getByLabelText("Form ID:");
            getByLabelText("Area Code:");
            getByText("Search");
            getByText("CUSTOMER INFORMATION");
            getByText("SEARCH FOR PAYMENTS BY ENTERING FORM ID");
        });
    });

    describe('Get Records Cases', () => {
        it('successful, should show customerInformation, PaymentRecords, and Input for adding new record', async () => {
            const spyGetPassbookItems = jest.spyOn(PassbookController, 'getPassbookItems');
            const { getByTestId, getByLabelText, getByText, getAllByText, getAllByPlaceholderText } = await performComp(Passbook, '/customer');
            
            perform(fireEvent.click,[getByTestId("showInputs-button")]);                //click button to show inputs
            fireEvent.change(getByLabelText("Form ID:"), {target: { value: 1 } });      //add input
            mockFetch(data.getPassbookItems);                                           //mock data to return correct data format
            await perform(fireEvent.click,[getByText("Search")], true);                 //click search to call getPassbookItems controller  

            expect(spyGetPassbookItems).toHaveBeenCalledTimes(1);
            getByText("First Name:");                                                   //shows at customer information
            getByTestId("1");                                                           //payment record 1 found under table
            getByTestId("2");                                                           //payment record 2 found under table
            expect(getAllByPlaceholderText("Collection").length).toEqual(2);            //this means inputs are existing for entering new record and 2 exist for each since its for mobile and (tab & desktop) view
            expect(getAllByText("Add").length).toEqual(2);                              //button for adding new records and 2 exist for each since its for mobile and (tab & desktop) view
        });

        it('no passbook, should call toast error and render default view', async () => {
            const spyToast = jest.spyOn(toast, 'error').mockImplementation(() => <h1>MockToastError</h1>);
            const spyGetPassbookItems = jest.spyOn(PassbookController, 'getPassbookItems');
            const { getByTestId, getByLabelText, getByText } = await performComp(Passbook, '/customer');
            
            perform(fireEvent.click,[getByTestId("showInputs-button")]);                //click button to show inputs
            fireEvent.change(getByLabelText("Form ID:"), {target: { value: 1 } });      //add input
            mockFetch(data.getPassbookItemsError);                                      //mock data to return error
            await perform(fireEvent.click,[getByText("Search")], true);                 //click search to call getPassbookItems controller  

            expect(spyGetPassbookItems).toHaveBeenCalledTimes(1);
            expect(spyToast).toHaveBeenCalledTimes(1);                                  //toast error is called because there is an error like no passbook
            getByText("SEARCH FOR PAYMENTS BY ENTERING FORM ID");                       //this shows under customer information which was the default view
            getByText("No Payments Found");                                             //this shows under table if no payment records found or no passbook which was the default view
        });

        it('no payments found, render customer information but show no payments found and add inputs', async () => {
            const spyGetPassbookItems = jest.spyOn(PassbookController, 'getPassbookItems');
            const { getByTestId, getByLabelText, getByText, getAllByText, getAllByPlaceholderText } = await performComp(Passbook, '/customer');
            
            perform(fireEvent.click,[getByTestId("showInputs-button")]);                //click button to show inputs
            fireEvent.change(getByLabelText("Form ID:"), {target: { value: 1 } });      //add input
            mockFetch(data.getPassbookItemsNoItems);                                    //mock data to return no payments
            await perform(fireEvent.click,[getByText("Search")], true);                 //click search to call getPassbookItems controller  

            expect(spyGetPassbookItems).toHaveBeenCalledTimes(1);
            getByText("First Name:");                                                   //shows at customer information
            getByText("No Payments Found");                                             //this shows under table if no payment records found or no passbook which was the default view
            expect(getAllByPlaceholderText("Collection").length).toEqual(2);            //this means inputs are existing for entering new record and 2 exist for each since its for mobile and (tab & desktop) view
            expect(getAllByText("Add").length).toEqual(2);                              //button for adding new records and 2 exist for each since its for mobile and (tab & desktop) view
        });
    });

    describe('Post New payment records', () =>{
        it('Call Dialog.confirm and postPassbookItem controller', async () => {
            const spyDialog = jest.spyOn(Dialog, 'confirm');
            const spyPostPassbookItem = jest.spyOn(PassbookController, 'postPassbookItem').mockImplementation(inputs => <h1>MockController</h1>);
            const { getByTestId, getByLabelText, getByText, getAllByText, getAllByPlaceholderText } = await performComp(Passbook, '/customer');
            
            perform(fireEvent.click,[getByTestId("showInputs-button")]);                               //click button to show inputs
            fireEvent.change(getByLabelText("Form ID:"), {target: { value: 1 } });                     //add input
            mockFetch(data.getPassbookItems);                                                          //mock data to return correct data format
            await perform(fireEvent.click,[getByText("Search")], true);                                //click search to call getPassbookItems controller  
            fireEvent.change(getAllByPlaceholderText("Collection")[0], {target: { value: 100 } });     //add inout to collection for adding new payment
            fireEvent.click(getAllByText("Add")[0]);                                                   //click Add button to call Dialog.confirm
            fireEvent.click(getByText("Yes"));                                                         //to call postPassbookItem controller

            expect(spyDialog).toHaveBeenCalledTimes(1);
            expect(spyPostPassbookItem).toHaveBeenCalledTimes(1);
            expect(spyPostPassbookItem).toHaveBeenCalledWith({applicationId: 4, "balance": 2800, "collection": "100", "passbookId": 2}, undefined); //undefined here is csrf which is not necessary in test
        });
    }); 
});