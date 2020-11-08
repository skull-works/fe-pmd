import React from 'react';
//ContentsForCustomer
import MainReports from '../pages/reports/content/main/main';
import CalendarReports from '../pages/reports/content/calendar/calendar';
import GraphReports from '../pages/reports/content/graphs/graphs';



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
            case 'Graphs':
                return(<GraphReports />);
            default:
                return(<MainReports />);
        }
    }
};