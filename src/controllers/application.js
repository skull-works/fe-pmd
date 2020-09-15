import { toast } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeManyValue } from './operations';

toast.configure();
const ApplicationController = {
    AddApplication: async (inputs, csrf) => {
        return fetch('/application_form', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf},
            body: JSON.stringify({...inputs})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.subject === "success")
                toast.success(data.message, {autoClose: 5000});
            else if(data.error){
                if(data.error.field && data.error.message)
                    toast.error(`${data.error.field} ${data.error.message}`,{autoClose: 20000});
                else if(data.error.message)
                    toast.error(data.error.message, {autoClose: 20000});
                else
                    throw new Error('something went wrong');
            } 
        })
        .catch(err => {
            toast.error('something went wrong, please call system administrator', {autoClose: 20000});
        })
    },
    getApplications: (inputs, setTableData, csrf) => {
        let query = JSON.stringify({
            first_name: inputs.first_name,
            last_name: inputs.last_name,
            type_loan: inputs.type_loan,
            status: inputs.status
        });
        return fetch(`/application_form/${inputs.start_date}/${inputs.end_date}?inputs=${query}`,{
            method: 'GET',
            headers: {'Content-Type':'application/json',
                      'X-CSRF-TOKEN': csrf},
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            if(data.error){
                if(data.error.field && data.error.message)
                    toast.error(`${data.error.field} ${data.error.message}`,{autoClose: 20000});
                else if(data.error.message)
                    toast.error(data.error.message, {autoClose: 5000});
                else
                    toast.error('Something went wrong call System Administrator', {autoClose: 5000});
            }
            else if(data.length > 0){
                setTableData(data);
                toast.success('Successfuly retrieved Applications', {autoClose: 10000});
            }
            else
                 toast.error('Something went wrong call System Administrator', {autoClose: 5000});
        })
        .catch(err => {
            toast.error(`${err}`,{autoClose: 20000});
        })
    },
    getApplicationDetail: async (area_code, formId, setApplicationDetails, csrf) => {
        return fetch(`/application_form-details/${area_code}/${formId}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf}
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            if(data.customer && data.application)
                setApplicationDetails(data);
            else
                toast.error('Something went wrong', {autoClose: 20000});
        })
        .catch(err => {
            toast.error(`${err}`,{autoClose: 20000});
        })
    },
    updateApplication: async (param, setTableData, setApplicationDetails, csrf) => {
        param.fieldValue = param.fields[`${param.fieldName}`];
        return fetch('/application_form',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrf },
            body: JSON.stringify({
                updateType: param.updateType,
                id: param.id,
                fieldName: param.fieldName,
                fieldValue: param.fieldValue,
                pay_type: param.pay_type,
                mnths_to_pay: param.fields.mnths_to_pay
            })
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            if(data.name === 'SequelizeDatabaseError')
                throw new Error({error:"something went wrong"});
            else if(data.error)
                toast.error(data.error.message, {autoClose: 10000});
            else
                toast.success(`${data.message} Updated successfuly`, {autoClose:5000});
            if(param.areaCode)
                changeManyValue(param.tableData, param.areaCode, param.fieldName, param.fieldValue,  param.id, setTableData);  
            setApplicationDetails(null);
        })
        .catch(err => {
            toast.error('Failed to update', {autoClose:10000});
        })
    }
}




export default ApplicationController;