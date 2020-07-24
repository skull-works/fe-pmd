import React, {useState} from 'react';
//controllers
import ApplicationController from '../../../../controllers/application';
//actions
import ApplicationActions from '../../../../actions/application'
//elements
import Input from '../../../../elements/input';
import Select from '../../../../elements/select';
import Date from '../../../../elements/date';

const ApplicationNew = () => {
    const [inputs, setInputs] = useState({type_loan: 'NEW'});
    const [isMarried, setMarried] = useState(false);
    const [isDaily, setDaily] = useState(true);
    const store = {
        setInputs: setInputs,
        inputs: inputs,
        isMarried: isMarried,
        setMarried: setMarried,
        isDaily: isDaily,
        setDaily: setDaily
    }

    return (
        <div className="w-9/12 mx-auto">
            <div className="text-sm md:text-2xl">
                 <h1>Customer New</h1>
            </div>
            <div className="mt-6 pb-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Area Code:"       name="area_code"       callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="First Name:"      name="first_name"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Last Name:"       name="last_name"       callback={ApplicationActions.InputChange} parameters={store}/>
                        <Date  label="Birth Date:"      name="birth_date"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Age:"             name="age"             callback={ApplicationActions.InputChange} parameters={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Contact Number:"  name="contact_no"      callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Street Address:"  name="street_address"  callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Barangay:"        name="barangay"        callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="City:"            name="city"            callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Province:"        name="province"        callback={ApplicationActions.InputChange} parameters={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Religion:"          name="religion"            callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Nationality:"       name="nationality"         callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Source of Income:"  name="source_of_income"    callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Length of Service:" name="length_of_service"   callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Length of Stay:"    name="length_of_stay"      callback={ApplicationActions.InputChange} parameters={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Occupation:"      name="occupation"          callback={ApplicationActions.InputChange} parameters={store}/>
                        <Select label="Civil status:"    name="civil_status"        callback={ApplicationActions.InputChange} parameters={store} options={['M','S']}/>
                        <Input  label="Days to pay:"     name="days_to_pay"         callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input  label="Loan amount:"     name="amount_loan"         callback={ApplicationActions.InputChange} parameters={store}/>
                        <Select label="Pay type:"        name="pay_type"            callback={ApplicationActions.InputChange} parameters={store} options={['DAILY','WEEKLY', 'MONTHLY']}/>
                        <ApplicationActions.MonthsToPayInput store={store} />
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Pay breakdown:"   name="pay_breakdown"     callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Processing Fee:"  name="proc_fee"          callback={ApplicationActions.InputChange} parameters={store}/>
                        <label>Remarks</label> <br />
                        <textarea name="remarks" onChange={e => ApplicationActions.InputChange(e.target, store)} className="rounded-md shadow-inner border focus:border-blue-400 focus:outline-none"></textarea>
                    </ul>
                </div>
            </div>
            <hr className="py-2"/> 
            {/*  Spouse Inputs */}
            <ApplicationActions.SpouseContent store={store} />

            <div className="pb-12 mt-4">
                <button type="button" className="w-40 mt-4 rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500"
                        onClick={() => ApplicationController.AddApplication(store.inputs)} >
                    Create Application
                </button>
            </div>
        </div>
    )
}

export default ApplicationNew;