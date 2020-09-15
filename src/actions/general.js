const GeneralActions = {
    InputChange: (inputName, inputValue, store) => {   //this is tested under application-test application-actions.test.js
        //inputUpdate
        if(inputValue === '---' || inputValue === '')
            delete store.inputs[inputName];
        else{
            store.inputs[inputName] = inputValue;
            store.setInputs(store.inputs);
        }
        
        //validation
        if(store.setMarried){
            if(store.inputs.civil_status === 'M' || store.inputs.civil_status ==='m' )
               store.setMarried(true);
            else
               store.setMarried(false);
        }
        if(inputName === "pay_type"){
            if(store.inputs.pay_type === 'WEEKLY' || store.inputs.pay_type === 'MONTHLY')
                store.setDaily(false);
            else
                store.setDaily(true);
        }
    }
}

export default GeneralActions;
