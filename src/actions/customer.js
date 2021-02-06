import React from 'react';
//ContentsForCustomer
import MainCustomer from '../pages/customer/content/main/main';
import Passbook from '../pages/customer/content/passbook/passbook';
import CustomerApplications from '../pages/customer/content/customer-applications/customer-applications'



export default {
    HeaderText: (locationQuery, setText) => {
        switch (locationQuery) {
            case "Passbook":
                setText("PASSBOOK");
                break;
            default:
                setText("CUSTOMER");
        }
    },
    ContentComponent: ({locationQuery}) => {
        switch(locationQuery){
            case 'Passbook':
                return(<Passbook  />);
            case 'PassbookHistory':
                return(<CustomerApplications />);
            default:
                return(<MainCustomer />);
        }
    }
};