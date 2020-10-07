import React from 'react';
import { render } from '@testing-library/react';

import { renderHook, perform } from '../test-util';
import ReportsActions from '../../actions/reports';

jest.mock('../../pages/reports/content/main/main', () => () => <h1>Reports Default View</h1>);

describe('Reports Actions', () => {

    describe('HeaderText', () => {
        const headerHook = () => {
            const [text, setText] = React.useState('REPORTS');
            return { text, setText};
        }

        it('Default Header Text', () => {
            const result = renderHook(headerHook);
            perform(ReportsActions.HeaderText,['/reports', result.setText]);
            expect(result.text).toEqual('REPORTS');
        });
        
        it('Calendar Header Text', () => {
            const result = renderHook(headerHook);
            perform(ReportsActions.HeaderText,['Calendar', result.setText]);
            expect(result.text).toEqual('CALENDAR REPORTS');
        });
    });


    describe('ContentComponent', () => {
        it('Default location query', () => {
            const { getByText } = render(<ReportsActions.ContentComponent locationQuery={'/reports'} />);
            getByText('Reports Default View');
        });
    });
});