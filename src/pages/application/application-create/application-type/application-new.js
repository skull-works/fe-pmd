import React from 'react';
//controllers
import ApplicationController from '../../../../controllers/application';
//elements
import Input from '../../../../elements/input';
import Select from '../../../../elements/select';
import Date from '../../../../elements/date';
//actions
import ApplicationActions from '../../../../actions/application';
import GeneralActions from '../../../../actions/general';
import { Hooks } from './hooks';

const ApplicationNew = ({csrf}) => {
    const store = Hooks();
    const { SpouseContent, MonthsToPayInput } = ApplicationActions;
    const { InputChange } = GeneralActions;
    return (
        <div className="w-9/12 mx-auto">
            <div className="text-sm md:text-2xl">
                 <h1>Customer New</h1>
            </div>
            <div className="mt-6 pb-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0" data-testid="info-details">
                        <Input label="Area Code:"       name="area_code"        store={store}/>
                        <Input label="First Name:"      name="first_name"       store={store}/>
                        <Input label="Last Name:"       name="last_name"        store={store}/>
                        <Date  label="Birth Date:"      name="birth_date"       store={store}/>
                        <Input label="Age:"             name="age"              store={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Contact Number:"  name="contact_no"       store={store}/>
                        <Input label="Street Address:"  name="street_address"   store={store}/>
                        <Input label="Barangay:"        name="barangay"         store={store}/>
                        <Input label="City:"            name="city"             store={store}/>
                        <Input label="Province:"        name="province"         store={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Religion:"          name="religion"             store={store}/>
                        <Input label="Nationality:"       name="nationality"          store={store}/>
                        <Input label="Source of Income:"  name="source_of_income"     store={store}/>
                        <Input label="Length of Service:" name="length_of_service"    store={store}/>
                        <Input label="Length of Stay:"    name="length_of_stay"       store={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input  label="Occupation:"      name="occupation"           store={store}/>
                        <Select label="Civil status:"    name="civil_status"         store={store} options={['M','S']}/>
                        <Input  label="Days to pay:"     name="days_to_pay"          store={store}/>
                        <Input  label="Loan amount:"     name="amount_loan"          store={store}/>
                        <Select label="Pay type:"        name="pay_type"             store={store} options={['DAILY','WEEKLY', 'MONTHLY']}/>
                        <MonthsToPayInput store={store} />
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Pay breakdown:"   name="pay_breakdown"      store={store}/>
                        <Input label="Processing Fee:"  name="proc_fee"           store={store}/>
                        <label htmlFor="remarks">Remarks:</label> <br />
                        <textarea name="remarks" 
                                  id="remarks"
                                  onChange={e => InputChange('remarks', e.target.value, store)} 
                                  className="rounded-md shadow-inner border focus:border-blue-400 focus:outline-none"></textarea>
                    </ul>
                </div>
            </div>
            <hr className="py-2"/> 
            {/*  Spouse Inputs */}
            <SpouseContent store={store}/>

            <div className="pb-12 mt-4">
                <button type="button" className="w-40 mt-4 rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500"
                        onClick={() => ApplicationController.AddApplication(store.inputs, csrf)} >
                    Create Application
                </button>
            </div>
        </div>
    )
}

export default ApplicationNew;