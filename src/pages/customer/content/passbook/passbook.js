import React  from 'react';
//hooks
import { Hooks } from './hooks';
//elements
import Input from '../../../../elements/input';
import Button from '../../../../elements/button'
//component
import PassbookItems from './component/table';
import CustomerInfo from './component/customer-info';
//controller
import PassbookController from '../../../../controllers/passbook';
//Authentication
import { IsUserStillLoggedIn } from '../../../mainHooks/AuthHooks';


const Passbook = () => {  
    let { csrf } = IsUserStillLoggedIn();
    const store = Hooks();
    return(
        <div id="content-wrapper">
            {/* button to show inputs */}
            <div className="flex justify-end bg-gray-200">
                <button className="p-2 focus:outline-none hover:bg-gray-300" onClick={store.toggleFilterShow} data-testid="showInputs-button">
                    {store.filterShow?
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 24 24">
                        <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z"/></svg>
                    }
                </button>
            </div>
            {/* inputs and customer information */}
            <div className={store.filterShow?"flex flex-col-reverse md:flex-row bg-gray-300 shadow-inner":"hidden"}>
                <div className="w-full md:w-6/12"> 
                    <CustomerInfo details={store.customerInfo}/>
                </div>
                <div className="w-full pt-4 pb-6 md:w-auto md:h-40 md:pr-24 flex flex-col md:flex-row">
                    <div className="px-3">
                        <Input label="Form ID:"    name="formId"      store={store}/>
                        <Input label="Area Code:"  name="area_code"   store={store}/>
                    </div>
                    <div className="w-11/12 mx-auto flex flex-wrap content-center justify-center">
                        <Button label="Search" 
                                position="w-full md:h-20 md:w-24 mt-4 md:mt-0"
                                callback={PassbookController.getPassbookItems} 
                                args={[store.inputs, store.setTableData, store.setCustomerInfo, store.setBalance, csrf]} />
                    </div>
                </div>
            </div>
            {/* content */}
            <PassbookItems parentStore={store} csrf={csrf}/>
        </div>
    );
}

export default Passbook;