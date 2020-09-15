import React from 'react';
import Input from '../../../../../elements/input';
import Date from '../../../../../elements/date';

const SpouseInputs = ({store}) => {
    return(
        <div id="spouse-wrapper">
            <div className="text-sm md:text-2xl">
                    <h1>Spouse Information</h1>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="First Name:"          name="Sfirst_name"       store={store}/>
                        <Input label="Last Name:"           name="Slast_name"        store={store}/>
                        <Date  label="Birth Date:"          name="Sbirth_date"       store={store}/>
                        <Input label="Contact Number:"      name="Scontact_no"       store={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Street Address:"      name="Sstreet_address"   store={store}/>
                        <Input label="Barangay:"            name="Sbarangay"         store={store}/>
                        <Input label="City:"                name="Scity"             store={store}/>
                        <Input label="Province:"            name="Sprovince"         store={store}/>
                    </ul>
                    <ul className="mr-8 mt-2 md:mt-0">
                        <Input label="Religion:"            name="Sreligion"         store={store}/>
                        <Input label="Source of income:"    name="Ssource_of_income" store={store}/>
                        <Input label="Nationality:"         name="Snationality"      store={store}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SpouseInputs;