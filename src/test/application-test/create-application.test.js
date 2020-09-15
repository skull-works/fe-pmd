import React from 'react';
//framework
import { fireEvent, cleanup, act } from '@testing-library/react';
//localModules
import ApplicationController from '../../controllers/application';
import GeneralActions from '../../actions/general';
import { renderComp, loopInputs, perform } from '../test-util';
import { arrNewLabel, arrNewValue, arrNewField,
         arrRenewLabel, arrRenewValue, arrRenewField } from '../mockData/create-application';
import data from '../mockData/create-application'

import Application from '../../pages/application/application';
import AuthenticationController from '../../controllers/authentication';


jest.mock('../../controllers/authentication');


afterEach(() => {
    cleanup;
    jest.clearAllMocks();
});


async function performComp(Component, Route){
    AuthenticationController.isStillLoggedIn.mockResolvedValueOnce({isLoggedIn: true});
    let results
    await act(async () => {
        results = await renderComp(Component, Route);
    });
    return results
}



describe('Rendering', () => {
    it('Render create-application content', () => {
        const { getByText } = renderComp(Application, '/application?q=CreateApplication');
        getByText("New");
        getByText("Renew/Special");
        // expect(asFragment()).toMatchSnapshot('create-application');
    });

    it('Click button New then render form application new', () => {
        const { getByText, asFragment } = renderComp(Application, '/application?q=CreateApplication');
        //click New button
        fireEvent.click(getByText('New'));
        //assertions
        expect(asFragment()).toMatchSnapshot('New-application');
    });

    it('Click button Renew/Special then render form application Renew/Special', () => {
        const { getByText, asFragment } = renderComp(Application, '/application?q=CreateApplication');
        //click Renew Button
        fireEvent.click(getByText('Renew/Special'));
        //assertions
        expect(asFragment()).toMatchSnapshot('Renew/Special-application');
    });
})


describe('New form', () => {

    it('Add input then call InputChange function and submit inputs which will call controller AddApplication', async () => {
        //initializing the mocks and components
        const spyApi = jest.spyOn(ApplicationController, 'AddApplication').mockImplementation(inputs => <h1> Mocked Controller </h1>);
        const spy = jest.spyOn(GeneralActions, 'InputChange');
        let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');

        //act--
        fireEvent.click(getByText('New'));
        loopInputs(arrNewLabel, arrNewValue, arrNewField, getByLabelText, spy);                     //InputChange function
        perform(fireEvent.click, [getByText("Create Application")]);                                //call controller AddAplication

        //assertions
        expect(spy).toHaveBeenCalledTimes(arrNewLabel.length);
        expect(spyApi).toHaveBeenCalledTimes(1);
        expect(spyApi.mock.calls[0][0]).toEqual(data.newArgsForAddApplicationController);
    });

    describe('MonthsToPayInput', () => {
        it("pay_type field input WEEKLY should call MonthToPayInput component with Input element", async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act--
            fireEvent.click(getByText('New'));
            fireEvent.change(getByLabelText("Pay type:"), {target: { value: "WEEKLY" }});           //show Input element if Pay type: WEEKLY/MONTHLY
            
            //assertions
            getByLabelText("Months/Weeks to pay:");
        });
    
        it("pay_type field input MONTHLY should call MonthToPayInput component with Input element", async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act--
            fireEvent.click(getByText('New'));
            fireEvent.change(getByLabelText("Pay type:"), {target: { value: "MONTHLY" }});           //show Input element if Pay type: WEEKLY/MONTHLY
            
            //assertions
            getByLabelText("Months/Weeks to pay:");
        });
    });

    describe('SpouseContent', () => {
        it('civil_status field input is "S" should not show spouse content', async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act--
            fireEvent.click(getByText('New'));
            fireEvent.change(getByLabelText("Civil status:"), {target: { value: "S" }});
            
            //assertions
            getByText('No spouse');
        })

        it('civil_status field inputs is "M" should show spouse content', async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act--
            fireEvent.click(getByText('New'));
            fireEvent.change(getByLabelText("Civil status:"), {target: { value: "M" }});
            
            //assertions    
            getByText("Spouse Information");
        });
    })
});


describe('Renew/Special form', () => {
    it('Add input then call InputChange function', async () => {
        //initializing the mocks and components
        const spyApi = jest.spyOn(ApplicationController, 'AddApplication').mockImplementation(inputs => <h1> Mocked Controller </h1>);
        const spy    = jest.spyOn(GeneralActions, 'InputChange');
        let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
        
        //act
        fireEvent.click(getByText('Renew/Special'));
        loopInputs(arrRenewLabel, arrRenewValue, arrRenewField, getByLabelText, spy)
        perform(fireEvent.click,[getByText("Create Application")]);
       
        //assertion
        expect(spy).toHaveBeenCalledTimes(arrRenewLabel.length);
        expect(spyApi).toHaveBeenCalledTimes(1);
        expect(spyApi.mock.calls[0][0]).toEqual(data.renewArgsForAddApplicationController);
    });

    describe('MonthsToPayInput', () => {
        it("pay_type field input WEEKLY should call MonthToPayInput component with Input element", async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act
            fireEvent.click(getByText('Renew/Special'));
            fireEvent.change(getByLabelText("Pay type:"), {target: { value: "WEEKLY" }});                       //show Input element if Pay type: WEEKLY
            
            //assertion
            getByLabelText("Months/Weeks to pay:");
        });
    
        it("pay_type field input MONTHLY should call MonthToPayInput component with Input element", async () => {
            //initializing the mocks and components
            let { getByText, getByLabelText } = await performComp(Application, '/application?q=CreateApplication');
            
            //act
            fireEvent.click(getByText('Renew/Special'));
            fireEvent.change(getByLabelText("Pay type:"), {target: { value: "MONTHLY" }});                      //show Input element if Pay type: MONTHLY
            
            //assertion
            getByLabelText("Months/Weeks to pay:");
        });
    });
});







