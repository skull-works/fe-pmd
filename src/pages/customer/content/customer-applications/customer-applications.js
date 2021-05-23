import React  from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import PassbookItems from './passbook-items/table';
import ApplicationTable from './application-table/application-table';
//elements
import Input from '../../../../elements/input';
import Button from '../../../../elements/button';
//controllers
import ApplicationController from '../../../../controllers/application';
//Hooks
import { Hooks } from  './hooks';
import authStore from '../../../../store/store';

const CustomerApplications = () => {
    const csrf = authStore((state) => state.csrfToken);
    const authenticateFalseAction = authStore((state) => state.authenticateFalseAction);
    let history = useHistory();
    const store = Hooks();

    return(
        <div id="content-wrapper">
            {/* button to show inputs */}
            <div className="flex justify-end bg-gray-200">
                <button className="p-2 focus:outline-none hover:bg-gray-300" onClick={store.toggleFilterShow} data-testid="filter-button">
                    {store.filterShow?
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z"/></svg>
                    }
                </button>
            </div>
            {/* inputs */}
            <div className={store.filterShow?"flex justify-center bg-gray-300 shadow-inner":"hidden"}>
                <div className="w-11/12 pt-4 pb-6 md:w-11/12 lg:w-auto md:h-40 md:pr-24 flex flex-col md:flex-row">
                    <div className="px-3">
                        <Input label="Area code:" name="area_code"  store={store}/>
                    </div>
                    <div className="px-3">
                        <Input label="First name:" name="first_name"  store={store}/>
                        <Input label="Last name:"  name="last_name"   store={store}/>
                    </div>
                    <div className="w-11/12 mx-auto flex flex-wrap content-center justify-center">
                        <Button label="Search" 
                                position="w-full md:h-20 md:w-24 mt-4 md:mt-0"
                                callback={ApplicationController.getApplications} 
                                args={[store.inputs, store.setTableData, csrf, true, history, authenticateFalseAction]} /> <br /> <br />
                                {store.tableData.length === 0 ? null : 
                            <h2 className="py-4 font-semibold font-Nunito md:hidden">ROWS FETCHED: <span className="text-blue-500">{store.tableData.length}</span></h2> }
                    </div>
                </div>
            </div>
            {/* content */}
            {store.passbookItems.length > 0 ? <PassbookItems tableData={store.passbookItems} setTableData={store.setPassbookItems} />
                                            : <ApplicationTable store={store} csrf={csrf} history={history} authenticateFalseAction={authenticateFalseAction}/>}
        </div>
    )
}

export default CustomerApplications;