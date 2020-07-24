import React, { useReducer, useState } from 'react';
//actions
import ApplicationActions from '../../../../../actions/application';
//controllers
import ApplicationController from '../../../../../controllers/application';
//elements
import Input from '../../../../../elements/input';
import Button from '../../../../../elements/button';


const Row = ({id, label, displayValue, fieldName, updateType, tableStore, formId}) => {
    const [isUpdate, toggleUpdate] = useReducer(isUpdate => !isUpdate, false);
    const [inputs, setInputs] = useState({});
    const [isDaily, setDaily] = useState(true);
    let store = {
        inputs:inputs,
        setInputs: setInputs,
        isDaily: isDaily,
        setDaily: setDaily
    }
    return(
        <div>
            <button className="focus:outline-none" onClick={toggleUpdate}>
                <li>
                <span className="text-blue-600 font-semibold">{label}:</span> {displayValue}</li>
            </button>
            {isUpdate?
            <>
            <Input  name={fieldName} callback={ApplicationActions.InputChange} parameters={store}/>
            <ApplicationActions.MonthsToPayInput store={store}/>
            <Button label="Update"   callback={ApplicationController.updateApplication} 
                parameters={{
                    updateType: updateType, 
                    id:id, 
                    fieldName: fieldName, 
                    fields: store.inputs,
                    tableStore: tableStore,
                    formId: formId
                }} />
            </>:null}
        </div>
    )
}

export default Row;