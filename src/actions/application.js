import React from 'react';
//rendering applications contents
import MainApplication from '../pages/application/application-main';
import CreateApplication from '../pages/application/application-create/application-create';
import ReviewApplication from '../pages/application/application-review/application-review';
//application-create types render
import ApplicationNew from '../pages/application/application-create/application-type/application-new';
import ApplicationRenew from '../pages/application/application-create/application-type/application-renew';
//mini components
import SpouseInputs from '../pages/application/application-create/application-type/spouse-component/spouse';
// elements
import Input from '../elements/input';





const ApplicationActions = {
    HeaderText: (location, setText) => {
        switch (location) {
            case "CreateApplication":
                setText("CREATE APPLICATION")
                break;
            case "ReviewApplications":
                setText("REVIEW APPLICATION")
                break;
            default:
                setText("APPLICATIONS")
        }
    },
    ContentComponent: ({location}) => {
        switch (location) {
            case "CreateApplication":
                return <CreateApplication />
            case "ReviewApplications":
                return <ReviewApplication />
            default:
                return(<MainApplication />)
        }
    },
    TypeApplication: ({typeloan}) => {
        switch (typeloan){
            case "New":
                return(<ApplicationNew />)
            case "Renew":
                return(<ApplicationRenew />)
            default:
                return(<h1 className="text-center text-md md:text-2xl pt-8">Choose The Type of Application First</h1>)
        }
    },
    InitializeInput: (fieldName,{inputs, setInputs}) => {
        console.log('initialize inputs');
        inputs[`${fieldName}`] = true;
        console.log(inputs);
        setInputs(inputs);
    },
    InputChange: (input, {inputs, setInputs, setMarried, setDaily}) => {
        console.log(inputs);
        //inputUpdate
        if(input.value === '---' || input.value === '')
            delete inputs[input.name];
        else{
            inputs[input.name] = input.value;
            setInputs(inputs);
        }

        //validation
        if(setMarried){
            if(inputs.civil_status === 'M' || inputs.civil_status ==='m' )
                setMarried(true);
            else
                setMarried(false);
        }
        if(input.name === "pay_type"){
            if(inputs.pay_type === 'WEEKLY' || inputs.pay_type === 'MONTHLY'){
                setDaily(false);
            }
            else{
                setDaily(true);
            }
        }
    },
    SpouseContent: ({store}) => {
        if(store.isMarried)
            return <SpouseInputs InputChange={ApplicationActions.InputChange} store={store}/>;
        return null
    },
    MonthsToPayInput: ({store}) => {
        if(store.isDaily === false){
            return <Input  label="Months/Weeks to pay:"     name="mnths_to_pay"  callback={ApplicationActions.InputChange} parameters={store}/>;
        }
        return null;
    },
    SetStateNull: (callback) => {
        callback(null);
    }
}

export default ApplicationActions;