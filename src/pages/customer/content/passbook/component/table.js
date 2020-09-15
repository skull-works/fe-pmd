import React from 'react';

import './styles.css';
import Button from '../../../../../elements/button';
import Dialog from '../../../../../elements/dialog';
import PassbookController from '../../../../../controllers/passbook';
import GeneralAction from '../../../../../actions/general';
import { Hooks } from '../hooks';


const PassbookItems = ({tableData, details, csrf}) => {
    const store = Hooks();
    const { InputChange } = GeneralAction;
    if(details) store.inputs.passbookId = details.passbook.id;
    if(tableData.length > 0) store.inputs.balance = tableData[tableData.length-1].balance;
    else if(details)  store.inputs.balance = details.total;

    //css
    let newPaymentInputCss = "h-6 w-10/12 rounded-md border-2 focus:outline-none focus:border-green-400 hover:border-green-400";
    let newMobileInputCssRow = "mobilePaymentInputs text-center h-12 hover:bg-gray-300";
    
    return (
            <div id="table-wrapper">
                <table className="passbookTable w-full" data-testid="passbookItems">
                    <thead>
                        <tr id="table-header" className="h-12 bg-gray-300">
                            <th>DATE</th>
                            <th>AMOUNT FINANCE</th>
                            <th>COLLECTION</th>
                            <th>BALANCE</th>
                            <th>INTEREST/PENALTY</th>
                            <th>COLLECTOR'S INITIAL</th>
                            <th>REMARKS</th>
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
                                        <td>{i.collector_initial}</td>
                                        <td>{i.remarks}</td>
                                    </tr>   
                                ))
                        }

                        {/* add input for new record */}
                        { details ?
                            <>
                                {/* tab to desktop view */}
                                <tr  className="paymentInputs text-center h-12 hover:bg-gray-300">
                                    <td className="addRecord">
                                        <Button label="Add" 
                                                position="w-10/12"
                                                callback={Dialog.confirm}
                                                args={[
                                                    PassbookController.postPassbookItem,
                                                    [store.inputs, csrf],
                                                    'Add Payment',
                                                    'Are you sure to add new payment?'
                                                ]} />
                                    </td>
                                    <td><input className={`${newPaymentInputCss}`} placeholder="Amount Finance"      name="amount_finance"    
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>    
                                    </td>
                                    <td><input className={`${newPaymentInputCss}`} placeholder="Collection"          name="collection"        
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>    
                                    </td>
                                    <td></td>
                                    <td><input className={`${newPaymentInputCss}`} placeholder="Interest Penalty"    name="interets_penalty"  
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>    
                                    </td>
                                    <td><input className={`${newPaymentInputCss}`} placeholder="Collector's Initial" name="collector_initial" 
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>    
                                    </td>
                                    <td><input className={`${newPaymentInputCss}`} placeholder="Remarks"             name="remarks"           
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>    
                                    </td>
                                </tr>

                                {/* mobile view */}
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7}>
                                        <input className={`${newPaymentInputCss}`} placeholder="Amount Finance"      name="amount_finance"
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                                    </td>
                                </tr>
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7}>
                                        <input className={`${newPaymentInputCss}`} placeholder="Collection"          name="collection"
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                                    </td>
                                </tr>
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7}>
                                        <input className={`${newPaymentInputCss}`} placeholder="Interest Penalty"    name="interets_penalty"
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                                    </td>
                                </tr>
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7}>
                                        <input className={`${newPaymentInputCss}`} placeholder="Collector's Initial" name="collector_initial"
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                                    </td>
                                </tr>
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7}>
                                        <input className={`${newPaymentInputCss}`} placeholder="Remarks"             name="remarks"
                                                onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                                    </td>
                                </tr>
                                <tr  className={`${newMobileInputCssRow}`}>
                                    <td colSpan={7} className="addRecord">
                                        <Button label="Add" 
                                                position="w-10/12 h-6" 
                                                callback={Dialog.confirm}
                                                args={[
                                                    PassbookController.postPassbookItem,
                                                    [store.inputs, csrf],
                                                    'Add Payment',
                                                    'Are you sure to add new payment?'
                                                ]}/>
                                    </td>
                                </tr>
                            </>
                            :
                            null
                        }
                    </tbody>
                </table>
            </div>
        )
}

export default PassbookItems;