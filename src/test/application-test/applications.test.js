import React from 'react';
import { fireEvent } from '@testing-library/react';
import TestUtil from '../test-util';

jest.mock('../../pages/application/application-create/application-create', () => () => <div>Create Application Page</div>);
jest.mock('../../pages/application/application-review/application-review', () => () => <div>Review Application Page</div>);

it('Application ui display with default content', () => {
    const { getByTestId, getByText, history } = TestUtil.renderWith('/application');
    getByText("APPLICATIONS");
    getByTestId("navbar-wrapper");
    expect(history.location.pathname).toBe('/application');
    expect(getByText('Create Application').nodeName).toEqual('A');
    expect(getByText('Review Applications').nodeName).toEqual('A');
});

    it('Application click link to create_application content from default content', () => {
        const { getByTestId, getByText, history, container } = TestUtil.renderWith('/application');
        //initial assertions
        getByText("APPLICATIONS");
        getByTestId("navbar-wrapper");
        expect(history.location.pathname).toBe('/application');
        //click link to create_application content
        fireEvent.click(getByText('Create Application'));
        //assertion
        expect(history.location.pathname + history.location.search).toBe('/application?q=CreateApplication');
        expect(container.innerHTML).toMatch('Create Application Page');
    });

    it('Application click link to review_application content default content', () => {
        const { getByTestId, getByText, history, container } = TestUtil.renderWith('/application');
        //initial assertions
        getByText("APPLICATIONS");
        getByTestId("navbar-wrapper");
        //click link to review_application content
        fireEvent.click(getByText('Review Applications'));
        //assertsion
        expect(history.location.pathname + history.location.search).toBe('/application?q=ReviewApplications');
        expect(container.innerHTML).toMatch('Review Application Page');
    })



