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
            headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf}
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                toast.error(data.error.message || 'Something went wrong, contact System Admin', {autoClose: 5000})
                setTableData([]);
                setCustomerInfo(null);
            }
            else if(data.passbook) {
                setTableData(data.passbook.passbookitems);
                setCustomerInfo(data);
            }
            else throw new Error(data);
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to retrieve payments, Something went wrong', {autoClose: 5000});       
        });
    },
    postPassbookItem: async (inputs, csrf, setBalance, balance) => {
        inputs.balance = balance ? balance : inputs.balance;
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
            else if(data.success){
                toast.success(data.message, {autoClose:5000});
                setBalance(data.passbookItem.balance);
            }
            else throw new Error('Something went wrong');
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to add payment, Something went wrong', {autoClose: 5000});     
        })
    },
    deletePassbookItem: async (paymentId, formId, collection, dates_paid, tableData, setTableData, csrf) => {
        try{
            let res = await fetch(`/passbook-item/${paymentId}/${formId}/${collection}/${dates_paid}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrf } 
            });
            if(res.status === 204){
                let filteredData = tableData.filter(data => data.id !== paymentId);
                setTableData(filteredData);
                return toast.success('Successfuly deleted', { autoClose: 5000 });
            }
            return toast.error('Something went wrong, contact system administrator', { autoClose: 5000 });
            
        }catch(err){
            toast.error('Something went wrong, contact system administrator', { autoClose: 5000 });
        }
    }
}

export default PassbookController;