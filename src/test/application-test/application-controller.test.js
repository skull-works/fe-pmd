import { toast } from 'react-toastify';
import { cleanup } from '@testing-library/react';
//local modules
import data from '../mockData/api';
import ApplicationController from '../../controllers/application';
import { Hooks, } from '../../pages/application/application-review/hooks';
import { renderHook, perform, mockFetch } from '../test-util';


afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
})

//helper
const expectAssertions = (spy, fetchArgs, spyArgs, fetchResolve, fetchResolveExpectedReturnValue) => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(...fetchArgs);
        if(spy){
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(...spyArgs)
        }
        
        return expect(fetchResolve.json()).resolves.toEqual(fetchResolveExpectedReturnValue);
}


describe('ApplicationController', () => {
    describe('AddApplication', () => {
        it('ApplicationController success', async () => {
            const spy = jest.spyOn(toast, 'success');
            mockFetch(data.addApplicationFetchResloveData);
            await ApplicationController.AddApplication(data.addApplicationInputs);
            
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Application added succesfuly', {autoClose: 5000}];

            expectAssertions(spy, data.addApplicationArguments, spyArgs, returnVal, data.addApplicationFetchResloveData);
        });

        it('ApplicationController error without field response', async () => {
            const spy = jest.spyOn(toast, 'error');
            mockFetch(data.addApplicationFetchResloveErrorData);
            await ApplicationController.AddApplication(data.addApplicationInputs);

            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Has an PROCESSING/APPROVED/ONGOING application already, please review applications for this area code', { autoClose: 20000 }];

            expectAssertions(spy, data.addApplicationArguments, spyArgs, returnVal, data.addApplicationFetchResloveErrorData);
        });

        it('ApplicationController error with field response', async () => {
            const spy = jest.spyOn(toast, 'error');
            mockFetch(data.addApplicationFetchResloveErrorDataWithField);
            await ApplicationController.AddApplication(data.addApplicationInputs);

            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['area_code already existing', { autoClose: 20000 }];

            expectAssertions(spy, data.addApplicationArguments, spyArgs, returnVal, data.addApplicationFetchResloveErrorDataWithField);
        });
    });

    
    describe('getApplications', () => {
        it('Call getApplications and return error with field', async () => {
            const spy = jest.spyOn(toast, 'error');
            const result = renderHook(Hooks);
            mockFetch(data.getApplicationsFetchResloveErrorDataWithField);
            //act
            await perform( ApplicationController.getApplications, 
                    [data.getApplicationsPassedArguments, result.setTableData], 
                    true);
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['area_code Bad input',{autoClose: 20000}];

            expectAssertions(spy, data.getApplicationsFetchExpectedArguments, spyArgs, returnVal, data.getApplicationsFetchResloveErrorDataWithField);
        });

        it('Call getApplications and return error without field', async () => {
            const spy = jest.spyOn(toast, 'error');
            const result = renderHook(Hooks);
            mockFetch(data.getApplicationsFetchResloveErrorDataWithOutField);
            //act
            await perform( ApplicationController.getApplications, 
                    [data.getApplicationsPassedArguments, result.setTableData], 
                    true);
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Something went wrong',{autoClose: 5000}];

            expectAssertions(spy, data.getApplicationsFetchExpectedArguments, spyArgs, returnVal, data.getApplicationsFetchResloveErrorDataWithOutField);
        });

        it('Call getApplications and return error No Data Found', async () => {
            const spy = jest.spyOn(toast, 'error');
            const result = renderHook(Hooks);
            mockFetch(data.getApplicationsFetchResolveDataNoData);
            //act
            await perform( ApplicationController.getApplications, 
                    [data.getApplicationsPassedArguments, result.setTableData], 
                    true);
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Something went wrong call System Administrator',{autoClose: 5000}];

            expectAssertions(spy, data.getApplicationsFetchExpectedArguments, spyArgs, returnVal, data.getApplicationsFetchResolveDataNoData);
        });

        it('Call getApplications Success', async () => {
            const spy = jest.spyOn(toast, 'success');
            const result = renderHook(Hooks);
            mockFetch(data.getApplicationFetchResolveSuccessData);
            //act
            await perform( ApplicationController.getApplications, 
                    [data.getApplicationsPassedArguments, result.setTableData], 
                    true);
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Successfuly retrieved Applications',{autoClose: 10000}];

            expectAssertions(spy, data.getApplicationsFetchExpectedArguments, spyArgs, returnVal, data.getApplicationFetchResolveSuccessData);
            expect(result.tableData.length).toEqual(1);
            expect(result.tableData[0]).toEqual(...data.getApplicationFetchResolveSuccessData)
        });
    });


    describe('getApplicationDetail', () => {
        it('No data found or an error occured should call toast error', async () => {
            const spyToast = jest.spyOn(toast, 'error');
            const results = renderHook(Hooks);
            mockFetch({});

            await perform(ApplicationController.getApplicationDetail, ['AC-01','1',results.setApplicationDetails], true);
            let returnVal = await fetch.mock.results[0].value;
            let spyArgs = ['Something went wrong', {autoClose: 20000}];
            
            expectAssertions(spyToast, data.getApplicationDetailExpectedFetchArguments, spyArgs, returnVal, {});
        });

        it('Successful data retrieval applicationDetails should set', async () => {
            const results = renderHook(Hooks);
            mockFetch(data.getApplicationDetailFetchResolveData);
            
            await perform(ApplicationController.getApplicationDetail, ['AC-01','1',results.setApplicationDetails], true);
            let returnVal = await fetch.mock.results[0].value;
            
            expectAssertions( false, data.getApplicationDetailExpectedFetchArguments, false, returnVal, data.getApplicationDetailFetchResolveData);
            expect(results.ApplicationDetails).toEqual(data.getApplicationDetailFetchResolveData);
        });
    });


    describe('updateApplication', () => {
        const setup = (tableStore) => {
            perform(tableStore.setApplicationDetails,[{customer: 'testDetails'}]);
            perform(tableStore.setTableData,[[{first_name: 'testName', area_code: 'TEST-01'}]]);
            expect(tableStore.ApplicationDetails).toEqual({customer: 'testDetails'});
            expect(tableStore.tableData).toEqual([{first_name: 'testName', area_code: 'TEST-01'}]);
        }

        it('Sequelize Database Error should show toast error', async () => {
            const spyToast = jest.spyOn(toast, 'error');
            let   spyArgs  = ['Failed to update', {autoClose:10000}];
            mockFetch(data.updateApplicationFetchResolveError);
            const tableStore = renderHook(Hooks);
            //act
            await perform(ApplicationController.updateApplication, data.updateApplicationArgumentToBePassedWithAreaCode(tableStore), true);
            let returnVal = await fetch.mock.results[0].value;
            //assertion
            expectAssertions(spyToast, data.updateApplicationFetchExpectedArgumentsPassed, spyArgs, returnVal, data.updateApplicationFetchResolveError);
        });

        it('Success update should set Application details null and call toast success, and setTableData for update', async () => {
            const spyToast = jest.spyOn(toast, 'success');
            let  spyArgs   = ['Application Updated successfuly', {autoClose:5000}];
            mockFetch(data.updateApplicationFetchResolveSuccess);
            const tableStore = renderHook(Hooks);
            //setup for tableData and applicationDetails Value to see changes after the setup
            setup(tableStore);
            //act
            await perform(ApplicationController.updateApplication, data.updateApplicationArgumentToBePassedWithAreaCode(tableStore), true);
            let returnVal = await fetch.mock.results[0].value;
            //assertion
            expectAssertions(spyToast, data.updateApplicationFetchExpectedArgumentsPassed, spyArgs, returnVal, data.updateApplicationFetchResolveSuccess);
            expect(tableStore.ApplicationDetails).toBeNull();
            expect(tableStore.tableData).toEqual([{first_name: 'testName', area_code: 'TEST-02'}]);
        });

        it('Success update should set Application details null and call toast success without setTableData update', async () => {
            const spyToast = jest.spyOn(toast, 'success');
            let  spyArgs   = ['Application Updated successfuly', {autoClose:5000}];
            mockFetch(data.updateApplicationFetchResolveSuccess);
            const tableStore = renderHook(Hooks);
            //setup for tableData and applicationDetails Value to see changes after the setup
            setup(tableStore);
            //act
            await perform(ApplicationController.updateApplication, data.updateApplicationArgumentToBePassedWithOutAreaCode(tableStore), true);
            let returnVal = await fetch.mock.results[0].value;
            //assertion
            expectAssertions(spyToast, data.updateApplicationFetchExpectedArgumentsPassed, spyArgs, returnVal, data.updateApplicationFetchResolveSuccess);
            expect(tableStore.ApplicationDetails).toBeNull();
            expect(tableStore.tableData).toEqual([{first_name: 'testName', area_code: 'TEST-01'}]);
        });
    });
});
