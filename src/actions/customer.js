import React from 'react';
//ContentsForCustomer
import MainCustomer from '../pages/customer/content/main/main';
import Passbook from '../pages/customer/content/passbook/passbook';



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
            default:
                return(<MainCustomer />);
        }
    }
};