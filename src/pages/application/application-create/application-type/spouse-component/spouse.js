import React from 'react';
import Input from '../../../../../elements/input';
import Date from '../../../../../elements/date';

const SpouseInputs = ({InputChange, store}) => {
    return(
        <div id="spouse-wrapper">
            <div className="text-sm md:text-2xl">
                    <h1>Spouse Information</h1>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="First Name:"      name="Sfirst_name"      callback={InputChange}    parameters={store}/>
                        <Input label="Last Name:"       name="Slast_name"       callback={InputChange}    parameters={store}/>
                        <Date  label="Birth Date:"      name="Sbirth_date"      callback={InputChange}    parameters={store}/>
                        <Input label="Contact Number:"  name="Scontact_no"      callback={InputChange}    parameters={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Street Address:"  name="Sstreet_address"  callback={InputChange}    parameters={store}/>
                        <Input label="Barangay:"        name="Sbarangay"        callback={InputChange}    parameters={store}/>
                        <Input label="City:"            name="Scity"            callback={InputChange}    parameters={store}/>
                        <Input label="Province:"        name="Sprovince"        callback={InputChange}    parameters={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Religion:"            name="Sreligion"         callback={InputChange}    parameters={store}/>
                        <Input label="Source of income:"    name="Ssource_of_income" callback={InputChange}    parameters={store}/>
                        <Input label="Nationality:"         name="Snationality"      callback={InputChange}    parameters={store}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SpouseInputs;