import React from 'react';
//elements
import Input from '../../../../elements/input';
import Select from '../../../../elements/select';
//controllers
import ApplicationController from '../../../../controllers/application';
//actions
import ApplicationActions from '../../../../actions/application';
import GeneralActions from '../../../../actions/general';
import { Hooks } from './hooks';

const ApplicationRenew = ({ csrf }) => {
    const store = Hooks();
    const { MonthsToPayInput } = ApplicationActions;
    const { InputChange } = GeneralActions;

    return (
        <div className="w-9/12 mx-auto">
            <div className="text-sm md:text-2xl">
                 <h1>Customer Renew</h1>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Area Code:"      name="area_code"     store={store}/>
                        <Input  label="First Name:"     name="first_name"    store={store}/>
                        <Input  label="Last Name:"      name="last_name"     store={store}/>
                        <Select label="Type of Loan:"   name="type_loan"     store={store} options={['RENEW','SP']}/>
                    </ul> 
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Days to pay:"     name="days_to_pay"  store={store}/>
                        <Input label="Loan amount:"      name="amount_loan"  store={store}/>
                        <Select label="Pay type:"        name="pay_type"     store={store} options={['DAILY','WEEKLY', 'MONTHLY']}/>
                        <MonthsToPayInput store={store} />
                        <Input label="Pay breakdown:"   name="pay_breakdown" store={store}/>
                     </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Processing Fee:"  name="proc_fee"      store={store}/>
                        <label htmlFor="remarks">Remarks:</label> <br />
                        <textarea   name="remarks"
                                    id="remarks" 
                                    onChange={e => InputChange('remarks', e.target.value, store)} 
                                    className="rounded-md shadow-inner border focus:border-blue-400 focus:outline-none">
                        </textarea>
                    </ul>
                </div>
                <div>
                    <button type="button" 
                            className="w-40 mt-4 rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500"
                            onClick={() => ApplicationController.AddApplication(store.inputs, csrf)} >
                        Create Application
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationRenew;