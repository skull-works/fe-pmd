import React from 'react';
//ContentsForCustomer
import MainReports from '../pages/reports/content/main/main';
import CalendarReports from '../pages/reports/content/calendar/calendar';



export default {
    HeaderText: (locationQuery, setText) => {
        switch (locationQuery) {
            case "Calendar":
                setText("CALENDAR REPORTS");
                break;
            default:
                setText("REPORTS");
        }
    },
    ContentComponent: ({locationQuery}) => {
        switch(locationQuery){
            case 'Calendar':
                return(<CalendarReports  />);
            default:
                return(<MainReports />);
        }
    }
};