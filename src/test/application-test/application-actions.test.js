import React  from 'react';
//npm packages
import { render } from '@testing-library/react';
//local modules
import ApplicationActions from '../../actions/application';
import GeneralActions from '../../actions/general';
import { renderHook, perform, loopInputs } from '../test-util';
import { Hooks } from '../../pages/application/application-create/application-type/hooks';
import {  arrSpouseLabel, arrSpouseValue, arrSpouseField } from '../mockData/create-application';
//pages componenets
import SpouseInputs from '../../pages/application/application-create/application-type/spouse-component/spouse';


jest.mock('../../pages/application/application-main', () => () => <div>Application Page default</div>);
jest.mock('../../pages/application/application-review/application-review', () => () => <div>Review Application Page</div>)

afterEach(() => {
    jest.clearAllMocks();
})

describe('InputChange function', () => {
    it('Check if function InputChange is working correctly', () => {
        var { InputChange } = GeneralActions;
        const results = renderHook(Hooks);

        perform(InputChange,['area_code', 'AC-01', results]);

        expect(results.inputs).toEqual({ type_loan: 'NEW', area_code: 'AC-01' });
    });

    describe('inputs', () => {
        it('If inputValue is none then delete inputName within inputs', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks);
            //input some value
            perform(InputChange,['area_code', 'AC-01', results]);
            expect(results.inputs.area_code).not.toBeUndefined();
            //erase input value
            perform(InputChange,['area_code', '', results]);
            expect(results.inputs.area_code).toBeUndefined();
        });

        it('If inputValue is --- then delete inputName within inputs', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks);
            //input some value
            perform(InputChange,['area_code', 'AC-01', results]);
            expect(results.inputs.area_code).not.toBeUndefined();
            //erase input value
            perform(InputChange,['area_code', '---', results]);
            expect(results.inputs.area_code).toBeUndefined();
        });
    });
    
    describe('isDaily', () => {
        it('If pay_type is MONTHLY then hook isDaily = false',  () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks); 

            perform(InputChange,['pay_type', 'MONTHLY', results]);
            expect(results.isDaily).toBeFalsy();
        });

        it('If pay_type is WEEKLY then hook isDaily = false', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks); 
           
            perform(InputChange,['pay_type', 'WEEKLY', results]);
            expect(results.isDaily).toBeFalsy();
        });

        it('If pay_type is Daily then hook isDaily = true', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks); 

            perform(InputChange,['pay_type', 'DAILY', results]);
            expect(results.isDaily).toBeTruthy();
        });
    });
    

    describe('isMarried', () => {
        it('If civil_status is "M" then hook isMarried = true', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks);

            perform(InputChange,['civil_status', 'M', results]);
            expect(results.isMarried).toBeTruthy();
        });

        it('If civil_status is "m" then hook isMarried = true', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks);

            perform(InputChange,['civil_status', 'm', results]);
            expect(results.isMarried).toBeTruthy();
        });

        it('If civil_status is !"M/m" then hook isMarried = false', () => {
            var { InputChange } = GeneralActions;
            const results = renderHook(Hooks);

            perform(InputChange,['civil_status', 'S', results]);
            expect(results.isMarried).toBeFalsy();
        });
    });   
});


describe('MonthsToPayInput', () => {
    it('Render Months/Weeks to pay: input and get snapShot', () => {
        const store = renderHook(Hooks);
        //isDaily should be false
        perform(store.setDaily,[false]);
        //Render MonthsToPayInput
        const { getByLabelText, asFragment } = render(<ApplicationActions.MonthsToPayInput store={store} />);
        //assertion
        getByLabelText("Months/Weeks to pay:");
        expect(asFragment()).toMatchSnapshot('MonthsToPayInput');
    });

    it('Render null', () => {
        const store = renderHook(Hooks);
        const { container } = render(<ApplicationActions.MonthsToPayInput store={store} />);
        expect(container.innerHTML).toBe("");
    });
});


describe('SpouseContent', () => {
    it('SpouseContent Component', () => {
        const {asFragment} = render(<SpouseInputs />)
        expect(asFragment()).toMatchSnapshot('SpouseInputs');
    });

    it('Add input to spouse then call InputChange function', () => {
        const spy = jest.spyOn(GeneralActions, 'InputChange');
        const store = renderHook(Hooks);
        const { getByLabelText } =  render(<SpouseInputs  store={store} />);

        loopInputs(arrSpouseLabel, arrSpouseValue, arrSpouseField, getByLabelText, spy);
        expect(spy).toHaveBeenCalledTimes(arrSpouseLabel.length);
    });

    it('isMarried is false should display no spouse', () => {
        const store = renderHook(Hooks);
        //isMarried should be false
        expect(store.isMarried).toBeFalsy();
        //Render MonthsToPayInput
        const { getByText } = render(<ApplicationActions.SpouseContent store={store} />);
        //assertion
        getByText("No spouse");
    });

    it('isMarried is true should display Spouse Information', () => {
        const store = renderHook(Hooks);
        //isMarried should be false
        perform(store.setMarried,[true]);
        //Render MonthsToPayInput
        const { getByText } = render(<ApplicationActions.SpouseContent store={store} />);
        //assertion
        getByText("Spouse Information");
    });
});


describe('ContentComponent', () => {
    it('path argument = /application should render default content', () => {
        const {getByText} = render(<ApplicationActions.ContentComponent location={'/application'} />);
        getByText("Application Page default");
    });

    it('path argument = CreateApplication should render application-create component', () => {
        const { getByText} = render(<ApplicationActions.ContentComponent location={'CreateApplication'} />);
        getByText("New");
        getByText("Renew/Special");
        getByText("Choose The Type of Application First");
    });

    it('path argument = CreateApplication should render application-create component', () => {
        const { getByText} = render(<ApplicationActions.ContentComponent location={'ReviewApplications'} />);
        getByText("Review Application Page");
    });
})


describe('HeaderText', () => {
    const headerHook = () => {
        const [text, setText] = React.useState('APPLICATIONS');
        return {text, setText};
    }
   
    it('Default Header Text', () => {
        const results = renderHook(headerHook);
        ApplicationActions.HeaderText('/application', results.setText);
        expect(results.text).toEqual("APPLICATIONS");
    });

    it('CREATE APPLICATION', () => {
        const results = renderHook(headerHook);
        perform(ApplicationActions.HeaderText, ['CreateApplication', results.setText]);
        expect(results.text).toEqual("CREATE APPLICATION");
    });

    it('REVIEW APPLICATION', () => {
        const results = renderHook(headerHook);
        perform(ApplicationActions.HeaderText, ['ReviewApplications', results.setText]);
        expect(results.text).toEqual("REVIEW APPLICATION");
    });
});


describe('TypeApplication', () => {
    it('default', () => {
        const { getByText } = render(<ApplicationActions.TypeApplication />);
        getByText("Choose The Type of Application First"); 
    });

    it('New', () => {
        const { getByText } = render(<ApplicationActions.TypeApplication typeloan={'New'}  />);
        getByText("Customer New"); 
    });

    it('Renew', () => {
        const {getByText} = render(<ApplicationActions.TypeApplication typeloan={'Renew'}/>);
        getByText("Customer Renew");
    });
});