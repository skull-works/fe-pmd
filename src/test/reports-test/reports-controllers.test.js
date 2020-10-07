import ReportsController from '../../controllers/reports';
import { toast } from 'react-toastify';
import { Hooks } from '../../pages/reports/content/calendar/hooks';
import { mockFetch, renderHook, perform } from '../test-util';
import calendarData from './data/calendarData';


describe('Reports Controllers', () => {
    describe('Calendar Controllers', () => {
        it('Returns customer applications and payments should set state hooks with data', async () => {
            mockFetch(calendarData.getData);
            const store = renderHook(Hooks);
            await perform(ReportsController.getCalendarItems,[{ area_code: 'TEST-01', start_date: '2020-09-20', end_date: '2020-09-23' }, 'csrf', store.setDates, store.setCustomerPayments], true);
            
            expect(store.dates.length).toBeGreaterThan(0);
            expect(store.customerPayments.length).toBeGreaterThan(0);
        });

        it('Returns no data found should call toast error', async () => {
            mockFetch({ "error": { "message": "no data found"}});
            const spy = jest.spyOn(toast, 'error').mockImplementation(() => "Mock toast error");
            const store = renderHook(Hooks);
            await perform(ReportsController.getCalendarItems,[{ area_code: 'TEST-NOData', start_date: '2020-09-20', end_date: '2020-09-23' }, 'csrf', store.setDates, store.setCustomerPayments], true);
        
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
