import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderComp } from '../test-util';
import Application from '../../pages/application/application';

jest.mock('../../pages/application/application-create/application-create', () => () => <div>Create Application Page</div>);
jest.mock('../../pages/application/application-review/application-review', () => () => <div>Review Application Page</div>);


describe('Render Application', () => {
    it('Application default content', () => {
        const { getByText } = renderComp(Application, '/application');
        getByText("Create Application");
        getByText("Review Applications");
    });

    it('Application click link to create_application content from default content', () => {
        const { getByText, history, container } = renderComp(Application, '/application');
        //click link to create_application content
        fireEvent.click(getByText('Create Application'));
        //assertion
        expect(history.location.pathname + history.location.search).toBe('/application?q=CreateApplication');
        expect(container.innerHTML).toMatch('Create Application Page');
    });

    it('Application click link to review_application content from default content', () => {
        const { getByText, history, container } = renderComp(Application, '/application');
        //click link to review_application content
        fireEvent.click(getByText('Review Applications'));
        //assertsion
        expect(history.location.pathname + history.location.search).toBe('/application?q=ReviewApplications');
        expect(container.innerHTML).toMatch('Review Application Page');
    })
});




