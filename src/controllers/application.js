import { toast } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const ApplicationController = {
    AddApplication: (inputs) => {
        fetch('http://localhost:9000/application_form', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...inputs})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.subject === "existing")
                toast.info(`${data.message}`, {autoClose: 10000}); 
            else if(data.subject === "success")
                toast.success(`${data.message}`, {autoClose: 5000});
            else if(data.errorType === "input validation")   
                toast.error(`${data.field} ${data.message}`,{autoClose: 20000});
            else if(data.subject === "area_code & name" || data.subject === "type_loan")
                toast.dark(`${data.message}`,{autoClose: 20000});
            else   
                toast.error(`${data.message}`,{autoClose: 20000});
        })
        .catch(err => {
            toast.error(`${err}`,{autoClose: 20000});
        })
    },
    getApplications: ({inputs, setTableData}) => {
        inputs = JSON.stringify(inputs);
        fetch(`http://localhost:9000/application_form/${inputs}`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            if(data.errorType)
                toast.error(`${data.field} ${data.message}`, {autoClose: 10000});
            if(data.length > 0)
                 setTableData(data);
            else
                toast.info('No data Found', {autoClose: 10000});
        })
        .catch(err => {
            toast.error(`${err}`,{autoClose: 20000});
        })
    },
    getApplicationDetail: ({area_code, formId, setApplicationDetails}) => {
        fetch(`http://localhost:9000/application_form-details/${area_code}/${formId}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            setApplicationDetails(data);
        })
        .catch(err => {
            toast.error(`${err}`,{autoClose: 20000});
        })
    },
    updateApplication: (param) => {
        param.fieldValue = param.fields[`${param.fieldName}`];
        fetch('http://localhost:9000/application_form',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
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
            console.log(data);
            if(data.name === 'SequelizeDatabaseError')
                throw new Error({error:"something went wrong"});
            toast.success(`${data.message} Updated successfuly`, {autoClose:5000});
            if(param.formId){
                let index = param.tableStore.tableData.findIndex(user => {return user.id === param.formId});
                param.tableStore.tableData[index][`${param.fieldName}`] = param.fieldValue;
                param.tableStore.setTableData(param.tableStore.tableData);
            }
            param.tableStore.setApplicationDetails(null);
        })
        .catch(err => {
            toast.error('Failed to update', {autoClose:10000});
        })
    }
}

export default ApplicationController;