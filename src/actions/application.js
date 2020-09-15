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
                setText("CREATE APPLICATION");
                break;
            case "ReviewApplications":
                setText("REVIEW APPLICATION");
                break;
            default:
                setText("APPLICATIONS");
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
    TypeApplication: ({ typeloan, csrf }) => {
        switch (typeloan){
            case "New":
                return(<ApplicationNew csrf={csrf}/>)
            case "Renew":
                return(<ApplicationRenew csrf={csrf} />)
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
    SpouseContent: ({store}) => {
        if(store.isMarried)
            return <SpouseInputs store={store}/>;
        return <h1>No spouse</h1>
    },
    MonthsToPayInput: ({store}) => {
        if(store.isDaily === false)
            return (<Input  label="Months/Weeks to pay:" name="mnths_to_pay" store={store}/>);
        return (null);
    },
    SetStateNull: (callback) => {
        callback(null);
    }
}

export default ApplicationActions;
