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
        const { asFragment, getByText, getByLabelText } = renderComp(CalendarReports, '/reports?q=Calendar');
        fireEvent.change(getByLabelText('From:'), { target: { value: "2020-09-01" } });
        fireEvent.change(getByLabelText('To:'), { target: { value: "2020-09-30" } });
        await perform(fireEvent.click,[getByText("Search")], true);

        expect(asFragment()).toMatchSnapshot();
    });

    it('Double Payment in Payments View for 1 date should add both payments', async () => {
        mockFetch(calendarData.getDataDoublePayment);
        const { getByText, getByLabelText } = renderComp(CalendarReports, '/reports?q=Calendar');
        fireEvent.change(getByLabelText('From:'), { target: { value: "2020-09-01" } });
        fireEvent.change(getByLabelText('To:'), { target: { value: "2020-09-30" } });
        await perform(fireEvent.click,[getByText("Search")], true);

        getByText('P400');
    })

    it('Customer Application is closed should show message indicating it is CLOSED', async () => {
        mockFetch(calendarData.getPaymentWithApplicationStatusClosed);
        const { getByText, getByLabelText } = renderComp(CalendarReports, '/reports?q=Calendar');
        fireEvent.change(getByLabelText('From:'), { target: { value: "2020-09-01" } });
        fireEvent.change(getByLabelText('To:'), { target: { value: "2020-09-30" } });
        await perform(fireEvent.click,[getByText("Search")], true);

        getByText("This customer's passbook is CLOSED");
    })
});