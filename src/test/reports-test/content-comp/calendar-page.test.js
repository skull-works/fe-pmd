import React from 'react';
import { renderComp, mockFetch, perform } from '../../test-util';
import CalendarReports from '../../../pages/reports/content/calendar/calendar';
import calendarData from '../data/calendarData';
import { fireEvent } from '@testing-library/react';


describe('Calendar Report Page', () => {
    it('Default view', () => {
        const { asFragment } = renderComp(CalendarReports, '/reports?q=Calendar');

        expect(asFragment()).toMatchSnapshot();
    });

    it('With Payments View', async () => {
        mockFetch(calendarData.getData);
        const { asFragment, getByText } = renderComp(CalendarReports, '/reports?q=Calendar');
        await perform(fireEvent.click,[getByText("Search")], true);

        expect(asFragment()).toMatchSnapshot();
    });

    it('Double Payment in Payments View for 1 date should add both payments', async () => {
        mockFetch(calendarData.getDataDoublePayment);
        const { getByText } = renderComp(CalendarReports, '/reports?q=Calendar');
        await perform(fireEvent.click,[getByText("Search")], true);

        getByText('P400');
    })
});