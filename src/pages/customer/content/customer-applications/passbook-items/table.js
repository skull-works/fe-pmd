import React from 'react';

import './styles.css';

import Button from '../../../../../elements/button';
import GeneralActions from '../../../../../actions/general';

const PassbookItems = ({ tableData, setTableData }) => {
    return (
        <React.Fragment>
            <div id="table-wrapper">
                <table className="passbookTable w-full" data-testid="passbookItems">
                    <thead>
                        <tr id="table-header" className="h-12 bg-gray-300">
                            <th>DATE</th>
                            <th>AMOUNT FINANCE</th>
                            <th>COLLECTION</th>
                            <th>BALANCE</th>
                            <th>INTEREST/PENALTY</th>
                            <th>REMARKS</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* payment records */}
                        {tableData.length === 0?
                            <tr className="h-60vh text-center text-3xl">
                                <td colSpan={7}>No Payments Found</td>
                            </tr>
                           :
                                tableData.map(i => (
                                    <tr key={i.id} data-testid={`${i.id}`} className="text-center h-12 font-semibold hover:bg-gray-300">
                                        <td>{i.dates_paid}</td>
                                        <td>{i.amount_finance}</td>
                                        <td>{i.collection}</td>
                                        <td>{i.balance}</td>
                                        <td>{i.interest_penalty}</td>
                                        <td>{i.remarks}</td>
                                    </tr>   
                                ))
                        }
                    </tbody>
                </table>
            </div>

            <Button label="Back"      
                position="w-40 mt-8 ml-16" 
                callback={GeneralActions.SetStateArrayZero} 
                args={[setTableData]} />

        </React.Fragment>
        )
}

export default PassbookItems;