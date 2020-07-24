import React from 'react';
import Button from '../../../../elements/button';
//actions
import ApplicationActions from '../../../../actions/application';
//controllers
import ApplicationController from '../../../../controllers/application';
//components 
import Row from './components/rows';






const ApplicationDetailsView = ({details, setApplicationDetails, tableStore}) => {
 return(
        <div id="content-wrapper">
            <div className="relative pl-10 pb-4 text-xs sm:text-sm md:text-md">
                <div className="absolute right-0 pr-20">
                    <h2 className="font-semibold sm:text-sm md:text-lg"><span className="text-blue-600 font-semibold">Date issued:</span>{details.application.date_issued}</h2>
                </div>
                <div className="pt-10 pb-10 sm:text-md lg:text-md xl:text-lg flex flex-col sm:flex-row justify-around">
                    <ul>
                        <li className="font-semibold text-lg">Customer</li>
                        <Row id={details.customer.id}    updateType="both"     label="Area code"      displayValue={details.customer.area_code}      fieldName="area_code"      tableStore={tableStore} formId={details.application.id}/>
                        <Row id={details.customer.id}    updateType="both"     label="First name"     displayValue={details.customer.first_name}     fieldName="first_name"     tableStore={tableStore} formId={details.application.id}/>
                        <Row id={details.customer.id}    updateType="both"     label="Last name"      displayValue={details.customer.last_name}      fieldName="last_name"      tableStore={tableStore} formId={details.application.id}/>
                        <Row id={details.customer.id}    updateType="customer" label="Birth date"     displayValue={details.customer.birth_date}     fieldName="birth_date"     tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Age"            displayValue={details.customer.age}            fieldName="age"            tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Contact #"      displayValue={details.customer.contact_no}     fieldName="contact_no"     tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="St.Address"     displayValue={details.customer.street_address} fieldName="street_address" tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Barangay"       displayValue={details.customer.barangay}       fieldName="barangay"       tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="City"           displayValue={details.customer.city}           fieldName="city"           tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Province"       displayValue={details.customer.province}       fieldName="province"       tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Religion"       displayValue={details.customer.religion}       fieldName="religion"       tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer" label="Nationality"    displayValue={details.customer.nationality}    fieldName="nationality"    tableStore={tableStore} />
                    </ul>
                    <ul>
                        <br />
                        <Row id={details.customer.id}    updateType="customer"    label="Source of income"  displayValue={details.customer.source_of_income}   fieldName="source_of_income" tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer"    label="Length of service" displayValue={details.customer.length_of_service}  fieldName="length_of_service"tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer"    label="Length of stay"    displayValue={details.customer.length_of_stay}     fieldName="length_of_stay"   tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer"    label="Occupation"        displayValue={details.customer.occupation}         fieldName="occupation"       tableStore={tableStore} />
                        <Row id={details.customer.id}    updateType="customer"    label="Civil status"      displayValue={details.customer.civil_status}       fieldName="civil_status"     tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Days to pay"       displayValue={details.application.days_to_pay}     fieldName="days_to_pay"      tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Loan amount"       displayValue={details.application.amount_loan}     fieldName="amount_loan"      tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Pay type"          displayValue={details.application.pay_type}        fieldName="pay_type"         tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Pay breakdown"     displayValue={details.application.pay_breakdown}   fieldName="pay_breakdown"    tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Processing Fee"    displayValue={details.application.proc_fee}        fieldName="proc_fee"         tableStore={tableStore} />
                        <Row id={details.application.id} updateType="application" label="Remarks"           displayValue={details.application.remarks}         fieldName="remarks"          tableStore={tableStore} />
                    </ul>
                    <ul className="md:pl-0 lg:pl-6">
                        <li className="font-semibold text-lg">Spouse</li>
                        <Row id={details.spouse.id} updateType="spouse" label="First name"        displayValue={details.spouse.Sfirst_name}        fieldName="Sfirst_name"       tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Last name"         displayValue={details.spouse.Slast_name}         fieldName="Slast_name"        tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Birth date"        displayValue={details.spouse.Sbirth_date}        fieldName="Sbirth_date"       tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Contact #"         displayValue={details.spouse.Scontact_no}        fieldName="Scontact_no"       tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="St.Address"        displayValue={details.spouse.Sstreet_address}    fieldName="Sstreet_address"   tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Barangay"          displayValue={details.spouse.Sbarangay}          fieldName="Sbarangay"         tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="City"              displayValue={details.spouse.Scity}              fieldName="Scity"             tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Province"          displayValue={details.spouse.Sprovince}          fieldName="Sprovince"         tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Religion"          displayValue={details.spouse.Sreligion}          fieldName="Sreligion"         tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Source of income"  displayValue={details.spouse.Ssource_of_income}  fieldName="Ssource_of_income" tableStore={tableStore} />
                        <Row id={details.spouse.id} updateType="spouse" label="Nationality"       displayValue={details.spouse.Snationality}       fieldName="Snationality"      tableStore={tableStore} />
                    </ul>
                </div>
                <Button label="Approved"   position="ml-48"  callback={ApplicationController.updateApplication} parameters={{updateType:'application', formId:details.application.id, fieldName:'status', fieldValue: {status:'APPROVED'}}} />
                <Button label="Rejected"   callback={ApplicationController.updateApplication} parameters={{updateType:'application', formId:details.application.id, fieldName:'status', fieldValue: {status: 'REJECTED'}}} />
                <Button label="Close"      position="absolute right-0 bottom-0 mb-6 mr-12"  callback={ApplicationActions.SetStateNull} parameters={setApplicationDetails} />
            </div>
        </div>
 )
};

export default ApplicationDetailsView;