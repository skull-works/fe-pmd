import React, { useReducer, useState } from 'react';
import './styles.css';
import ApplicationDetailsView from './application-details/application-details';
import ApplicationTable from './application-table/application-table';
//elements
import Input from '../../../elements/input';
import Select from '../../../elements/select';
import Date from '../../../elements/date';
import Button from '../../../elements/button';
//controllers
import ApplicationController from '../../../controllers/application';
//actions
import ApplicationActions from '../../../actions/application';

const ApplicationReview = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [tableData, setTableData] = useState([]);
    const [ApplicationDetails, setApplicationDetails] = useState();
    let store = {
        inputs: inputs,
        setInputs: setInputs,
        tableData: tableData,
        setTableData: setTableData,
        ApplicationDetails: ApplicationDetails,
        setApplicationDetails: setApplicationDetails
    }
    return(
        <div id="content-wrapper">
            <div className="flex justify-end bg-gray-200">
                <button className="p-2 focus:outline-none hover:bg-gray-300" onClick={toggleFilterShow}>
                    {filterShow?
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z"/></svg>
                    }
                </button>
            </div>
            <div className={filterShow?"flex justify-center bg-gray-300 shadow-inner":"hidden"}>
                <div className="w-full pt-4 pb-6 md:w-auto md:h-40 md:pr-24 flex flex-col md:flex-row">
                    <div className="px-3">
                        <Input label="First name:" name="first_name"  callback={ApplicationActions.InputChange} parameters={store}/>
                        <Input label="Last name:"  name="last_name"   callback={ApplicationActions.InputChange} parameters={store}/>
                    </div>
                    <div className="px-3">
                        <Select label="Loan type:" name="type_loan" callback={ApplicationActions.InputChange} parameters={store} options={['NEW', 'RENEW', 'SP']}/>
                        <Select label="Status:"    name="status"    callback={ApplicationActions.InputChange} parameters={store} options={['PROCESSING','APPROVED', 'REJECTED','ONGOING','CLOSED']} />
                    </div>
                    <div className="px-3">
                        <Date label="From:" name="start_date"   callback={ApplicationActions.InputChange} parameters={store}/>
                        <Date label="to:"   name="end_date"     callback={ApplicationActions.InputChange} parameters={store}/>
                    </div>
                    <div className="pt-16">
                        <Button label="Search" callback={ApplicationController.getApplications} parameters={store} />
                    </div>
                </div>
            </div>
            {ApplicationDetails?<ApplicationDetailsView details={ApplicationDetails} setApplicationDetails={setApplicationDetails} tableStore={store}  />
                               :<ApplicationTable tableData={tableData} setApplicationDetails={setApplicationDetails}/>}
        </div>
    )
}

export default ApplicationReview;