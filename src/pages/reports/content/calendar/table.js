import React from 'react';
import './styles.css';

const CalendarItems = ({dates, customerPayments}) => {
    return (
            <div id="table-wrapper">
                <table className="calendarTable w-full" data-testid="passbookItems">
                    <thead>
                        <tr id="table-header" className="h-12 bg-gray-300">
                            <th>NAME</th>
                            {dates.length > 0 ?
                                    dates.map(date => (
                                        <th key={date}>{date}</th>
                                    ))
                                :
                                null 
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {customerPayments.length > 0 ?
                                customerPayments.map(customer => { 
                                   let i = 0; // for iterating the passbookitems 
                                   return(
                                         <tr key={customer.id}>
                                            <td className="text-center">{customer.first_name} <br /> {customer.last_name} <br /> {customer.customer.contact_no}</td>
                                            {customer.status === 'ONGOING' ?
                                                customer.passbook ? 
                                                        dates.map(date => {
                                                            let customerItem = customer.passbook.passbookitems[i];
                                                            let nextItem = customer.passbook.passbookitems[i+1];
                                                            if(customerItem && (customerItem.dates_paid === date)){
                                                                if(nextItem && customerItem.dates_paid === nextItem.dates_paid){
                                                                    customerItem.collection += nextItem.collection
                                                                    i+=2;
                                                                }else
                                                                    i++;
                                                                return(<td key={customerItem.id} className="text-center">P{customerItem.collection}</td>)
                                                            }
                                                            return(<td key={date} className="text-center">N</td>)
                                                        })
                                                    :
                                                    <td colSpan={dates.length}> No payments for this customer with these dates </td>
                                                :
                                                <td colSpan={dates.length} className="font-bold">This customer's passbook is CLOSED</td>
                                            }
                                        </tr>
                                   )
                                })
                            :
                            null
                        }
                    </tbody>
                </table>
            </div>
        )
}

export default CalendarItems;