import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderComp } from '../../test-util';
import Customer from '../../../pages/customer/customer';

jest.mock('../../../pages/customer/content/passbook/passbook', () => () => <h1>Customer Passbook View</h1>);

describe('Default Content inside Passbook Component/Page', () => {
    it('Default View', () => {
        const {history, getByText} = renderComp(Customer, '/customer');
        expect(history.location.pathname).toBe('/customer');
        getByText("Passbook");
    });

    it('Passbook button to render Passbook component', () => {
        const {history, getByText} = renderComp(Customer, '/customer');
        fireEvent.click(getByText("Passbook"));
        expect(history.location.pathname + history.location.search).toBe('/customer?q=Passbook');
        getByText('Customer Passbook View');
    });
});