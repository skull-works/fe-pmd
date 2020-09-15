//framework
import React from 'react';
import { fireEvent, cleanup, act } from '@testing-library/react';
import { toast } from 'react-toastify';
//local modules
import { showApplicationDetails, searchTableRecords, spies } from './helpers/helper';
import { mockFetch, perform, renderComp } from '../test-util';

import Application from '../../pages/application/application';
import AuthenticationController from '../../controllers/authentication';
import PassbookController from '../../controllers/passbook';
import Dialog from '../../elements/dialog';
import { updateApplicationExpectedArgumentAreaCode, updateApplicationFetchResolveSuccess, 
         updateApplicationExpectedArgumentFirstName, updateApplicationExpectedArgumentLasName } from '../mockData/review-application';

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
})

jest.mock('../../controllers/authentication');

async function performComp(Component, Route){
    AuthenticationController.isStillLoggedIn.mockResolvedValueOnce({isLoggedIn: true});
    let results
    await act(async () => {
        results = await renderComp(Component, Route);
    });
    return results
}

describe('Application details', () => {
    describe('Update Application details', () => {
        const setup = async () => {
            toast.success = jest.fn().mockImplementation(() => <h1>MocktoastSuccess</h1>);
            toast.error = jest.fn().mockImplementation(() => <h1>MocktoastError</h1>);
            const { spyInputChange, spyApiDetails, spyApiUpdate } = spies();
            //render Component
            const { getByTestId, getAllByTestId, getByLabelText, getByText, getAllByText, asFragment } = await performComp(Application, '/application?q=ReviewApplications');
            //Show Table Recirds
            await searchTableRecords(getByTestId, getByText, getByLabelText, spyInputChange);
            //Show application details
            await showApplicationDetails(getAllByText, spyApiDetails, getByText);

            return { getByText, getAllByTestId, spyApiUpdate, getByTestId, asFragment }
        }

        it('Press Close Button to return table record view', async () => {
            //setup
            const { getByText } = await setup();
            //Press close button
            fireEvent.click(getByText("Close"));
            getByText('TEST-01');
            getByText('TEST-02');
        });

        describe('Update area_code, first_name, last_name then show table record view and in that view changes should reflect', () => {
            it('Area code', async () => {
                //setup
                const { getByText, getByTestId, spyApiUpdate } = await setup();
                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                fireEvent.click(getByText('TEST-01'));                                                      // press area code field to show input for update
                fireEvent.change(getByTestId('area_code'), { target: { value: 'TEST-04' }});                // input new value
                await perform(fireEvent.click,[getByText("Update")], true);                                 // press update
                //assertions
                getByText('TEST-04');                                                                       //table record 1
                getByText('TEST-02');                                                                       //table record 2
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(spyApiUpdate.mock.calls[0][0]).toEqual(updateApplicationExpectedArgumentAreaCode);   //refer to the comments in the mockData revew-application to understand this part
            });

            it('First name', async () => {
                //setup
                const { getByText, getAllByTestId, spyApiUpdate } = await setup();
                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                fireEvent.click(getByText("Marco Theo"));                                                       // press first name field to show input for update
                fireEvent.change(getAllByTestId("first_name")[1], { target: { value: 'TestFirstName4' }});      // input new value for the first_name field used getAllByTestId[1] becausee getAllByTestId[0] is from filter inputs area
                await perform(fireEvent.click,[getByText("Update")], true);                                     // press update
                // //assertions
                getByText('TestFirstName4 TestLastName1');                                                      //table record 1
                getByText('TestFirstName2 TestLastName2');                                                      //table record 2
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(spyApiUpdate.mock.calls[0][0]).toEqual(updateApplicationExpectedArgumentFirstName);      //refer to the comments in the mockData revew-application to understand this part
            });

            it('Last name', async () => {
                //setup
                const { getByText, getAllByTestId, spyApiUpdate } = await setup();
                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                fireEvent.click(getByText("Butalid"));                                                          // press last name field to show input for update
                fireEvent.change(getAllByTestId("last_name")[1], { target: { value: 'TestLastName4' }});        // input new value for the first_name field used getAllByTestId[1] becausee getAllByTestId[0] is from filter inputs area
                await perform(fireEvent.click,[getByText("Update")], true);                                     // press update
                // //assertions
                getByText('TestFirstName1 TestLastName4');                                                      //table record 1
                getByText('TestFirstName2 TestLastName2');                                                      //table record 2
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(spyApiUpdate.mock.calls[0][0]).toEqual(updateApplicationExpectedArgumentLasName);        //refer to the comments in the mockData revew-application to understand this part
            });

            it('Approved', async () => {
                //setup
                const { getByText, spyApiUpdate, asFragment } = await setup();

                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                await perform(fireEvent.click,[getByText("Approved")], true);                                   // press Approved

                //assertions
                getByText('TestFirstName1 TestLastName1');                                                      //table record 1
                getByText('TestFirstName2 TestLastName2');                                                      //table record 2
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(toast.success).toHaveBeenCalledTimes(2);
                expect(asFragment()).toMatchSnapshot('Success-status-is-approved-update');
            });

            it('Rejected', async () => {
                //setup
                const { getByText, spyApiUpdate, asFragment } = await setup();

                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                await perform(fireEvent.click,[getByText("Rejected")], true);                                   // press Rejected

                //assertions
                getByText('TestFirstName1 TestLastName1');                                                      //table record 1
                getByText('TestFirstName2 TestLastName2');                                                      //table record 2
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(toast.success).toHaveBeenCalledTimes(2);
                expect(asFragment()).toMatchSnapshot('Success-status-is-rejected-update');
            });
        });

        describe('Creating Passbook', () => {
            it('Click CREATE PASSBOOK should call Dialog.confirm and PassbookController.postPassbook', async () => {
                //setup
                const spyDialogConfirm = jest.spyOn(Dialog, 'confirm');
                const spyPostPassbook = jest.spyOn(PassbookController, 'postPassbook').mockImplementation(() => <h1>mock controller</h1>);
                const { getByText } = await setup();
                //Act Update a field
                mockFetch(updateApplicationFetchResolveSuccess);
                fireEvent.click(getByText('CREATE PASSBOOK'));                        // press CREATE PASSBOOK to call Dialog.confirm to show Dialog box
                fireEvent.click(getByText("Yes"));                                    // Inside Dialog box click Yes to call PassbookController.postPassbook which creates the passbook         
                //assertions
                expect(spyDialogConfirm).toHaveBeenCalledTimes(1);
                expect(spyDialogConfirm).toHaveBeenCalledWith(PassbookController.postPassbook,
                                                              ["TEST-01", 1, undefined],       //undefined here is the csrf so no need to put since its just a test
                                                              'Creating Passbook!',
                                                              'are you sure you want to create passbook this customer?' );
                expect(spyPostPassbook).toHaveBeenCalledTimes(1);
                expect(spyPostPassbook).toHaveBeenCalledWith("TEST-01", 1, undefined);
            });
        });

        describe('Errors', () => {
            it('Invalid sent id should return an error', async () => {
                //setup
                const { getByText, spyApiUpdate, asFragment } = await setup();

                //Act Update a field
                mockFetch({error: {}});
                getByText("REJECTED")
                await perform(fireEvent.click,[getByText("Rejected")], true);                               // press reject button

                //assertions
                expect(spyApiUpdate).toHaveBeenCalledTimes(1);
                expect(toast.error).toHaveBeenCalledTimes(1);
            })
        });
    });
});