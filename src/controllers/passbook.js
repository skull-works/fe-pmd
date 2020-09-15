import { toast } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();
const PassbookController = {
    postPassbook: async (area_code, AppId, csrf) => {
        return fetch('/passbook', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf},
            body: JSON.stringify({
                area_code: area_code,
                AppId: AppId
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                toast.error(data.error.message, {autoClose: 10000});
            else if(data.success)
                toast.success(data.message,{ autoClose: 5000});
            else
                throw new Error({error:"something went wrong"});
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to create passbook, Something went wrong', {autoClose: 5000});       
        })
    },
    getPassbookItems: async (inputs, setTableData, setCustomerInfo, csrf) => {
        let formId = inputs.formId;
        return fetch(`/passbook-item/${formId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf}
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                toast.error(data.error.message || 'Something went wrong, contact System Admin', {autoClose: 5000})
                setTableData([]);
                setCustomerInfo(null);
            }
            else if(data.passbook) {
                setTableData(data.passbook.passbookItems);
                setCustomerInfo(data);
            }
            else throw new Error(data);
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to retrieve payments, Something went wrong', {autoClose: 5000});       
        });
    },
    postPassbookItem: async (inputs, csrf) => {
        return fetch('/passbook-item', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf},
            body: JSON.stringify(inputs) 
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)                                                  //usually if no passbook found
                toast.error(data.error.message, {autoClose:5000})
            else if(data.success)
                toast.success(data.message, {autoClose:5000})
            else throw new Error('Something went wrong');
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to add payment, Something went wrong', {autoClose: 5000});     
        })
    }
}

export default PassbookController;