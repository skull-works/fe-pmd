import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderComp } from '../../test-util';
import Customer from '../../../pages/customer/customer';
import Reports from '../../../pages/reports/reports';

jest.mock('../../../pages/customer/content/passbook/passbook', () => () => <h1>Customer Passbook View</h1>);

describe('Default Content inside Reports Component/Page', () => {
    it('Default View', () => {
        const {history, getByText} = renderComp(Reports, '/reports');
        expect(history.location.pathname).toBe('/reports');
        getByText("Calendar Reports");
    });
});