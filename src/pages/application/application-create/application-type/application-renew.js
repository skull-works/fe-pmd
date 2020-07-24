import React, { useState } from 'react';
//elements
import Input from '../../../../elements/input';
import Select from '../../../../elements/select';
//controllers
import ApplicationController from '../../../../controllers/application';
//actions
import ApplicationActions from '../../../../actions/application';

const ApplicationRenew = () => {
    const [inputs, setInputs] = useState({});
    const [isDaily, setDaily] = useState(true);
    const store = {
        setInputs: setInputs,
        inputs: inputs,
        isDaily: isDaily,
        setDaily: setDaily
    }


    return (
        <div className="w-9/12 mx-auto">
            <div className="text-sm md:text-2xl">
                 <h1>Customer Renew</h1>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Area Code:"      name="area_code"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input  label="First Name:"     name="first_name"     callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input  label="Last Name:"      name="last_name"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <Select label="Type of Loan:"   name="type_loan"      callback={ApplicationActions.InputChange} parameters={store} options={['RENEW','SP']}/>
                    </ul> 
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Days to pay:"    name="days_to_pay"    callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Loan amount:"      name="amount_loan"   callback={ApplicationActions.InputChange} parameters={store}/>
                        <Select label="Pay type:"        name="pay_type"      callback={ApplicationActions.InputChange} parameters={store} options={['DAILY','WEEKLY', 'MONTHLY']}/>
                        <ApplicationActions.MonthsToPayInput store={store} />
                        <Input label="Pay breakdown:"   name="pay_breakdown" callback={ApplicationActions.InputChange} parameters={store}/>
                     </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Processing Fee:"  name="proc_fee"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <label>Remarks</label> <br />
                        <textarea name="remarks" onChange={e => ApplicationActions.InputChange(e.target, store)} className="rounded-md shadow-inner border focus:border-blue-400 focus:outline-none"></textarea>
                    </ul>
                </div>
                <div>
                    <button type="button" className="w-40 mt-4 rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500"
                           onClick={() => ApplicationController.AddApplication(inputs)} >
                        Create Application
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationRenew;