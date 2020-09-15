import React from 'react';
import { render } from '@testing-library/react';

import { renderHook, perform } from '../test-util';
import CustomerActions from '../../actions/customer';

jest.mock('../../pages/customer/content/main/main', () => () => <h1>Customer Default View</h1>);
jest.mock('../../pages/customer/content/passbook/passbook', () => () => <h1>Customer Passbook View</h1>);

describe('Customer Actions', () => {

    describe('HeaderText', () => {
        const headerHook = () => {
            const [text, setText] = React.useState('CUSTOMER');
            return { text, setText};
        }

        it('Default Header Text', () => {
            const result = renderHook(headerHook);
            perform(CustomerActions.HeaderText,['/customer', result.setText]);
            expect(result.text).toEqual('CUSTOMER');
        });
        
        it('Passbook Header Text', () => {
            const result = renderHook(headerHook);
            perform(CustomerActions.HeaderText,['Passbook', result.setText]);
            expect(result.text).toEqual('PASSBOOK');
        });
    });


    describe('ContentComponent', () => {
        it('Default location query', () => {
            const { getByText } = render(<CustomerActions.ContentComponent locationQuery={'/application'} />);
            getByText('Customer Default View');
        });

        it('Passbook location query', () => {
            const { getByText } = render(<CustomerActions.ContentComponent locationQuery={'Passbook'} />);
            getByText('Customer Passbook View');
        });
    });
});