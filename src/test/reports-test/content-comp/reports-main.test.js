import React from 'react';
import { renderComp } from '../../test-util';
import Reports from '../../../pages/reports/reports';

jest.mock('../../../pages/customer/content/passbook/passbook', () => () => <h1>Customer Passbook View</h1>);

describe('Default Content inside Reports Component/Page', () => {
    it('Default View', () => {
        const {history, getByText} = renderComp(Reports, '/reports');
        expect(history.location.pathname).toBe('/reports');
        getByText("Calendar Reports");
    });
});