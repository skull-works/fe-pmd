import { fireEvent } from '@testing-library/react';
//mockData
import { arrDatesLabel, arrDatesValue, arrDatesField,
         getApplicationFetchResolveSuccessData, getApplicationDetailFetchResolveData } from '../../mockData/review-application';
// controllers and actions or local modules
import GeneralActions from '../../../actions/general';
import ApplicationController from '../../../controllers/application';
import { loopInputs, mockFetch, perform } from '../../test-util';



//FOR REVIEW APPLICATION TEST


export const searchTableRecords = async (getByTestId, getByText, getByLabelText, spyInputChange) => {                      
    mockFetch(getApplicationFetchResolveSuccessData());
    fireEvent.click(getByTestId("filter-button"));                                                 //to show inputs
    loopInputs(arrDatesLabel, arrDatesValue, arrDatesField, getByLabelText, spyInputChange);       // enter inputs
    await perform(fireEvent.click,[getByText("Search")], true);                                    //submit inputs to show table records
    let fetchResolve = await fetch.mock.results[0].value;                                          //return value of fetch from getApplications controller

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetchResolve.json()).resolves.toEqual(getApplicationFetchResolveSuccessData());
    getByText('TEST-01');
    getByText('TEST-02');
};

export const showApplicationDetails = async (getAllByText, spyApi, getByText) => {
    mockFetch(getApplicationDetailFetchResolveData);                      //this is what it will resolve the fetch function to when Click review button
    await perform(fireEvent.click,[getAllByText("Review")[0]], true);    // click review on 1st record which is test-01 to show its application details
    let data = await fetch.mock.results[0].value;
    //assertions
    expect(spyApi).toHaveBeenCalledTimes(1);
    expect(spyApi.mock.calls[0][0]).toEqual('TEST-01');
    expect(spyApi.mock.calls[0][1]).toEqual(1);
    expect(data.json()).resolves.toEqual(getApplicationDetailFetchResolveData);
    //Render Application details content with the details
    getByText("Rejected");
    getByText("Approved");
}

export const spies = () => {
    const spyInputChange = jest.spyOn(GeneralActions, 'InputChange');
    const spyApiDetails  = jest.spyOn(ApplicationController, 'getApplicationDetail');
    const spyApiUpdate   = jest.spyOn(ApplicationController, 'updateApplication');
    return { spyInputChange, spyApiDetails, spyApiUpdate};
}