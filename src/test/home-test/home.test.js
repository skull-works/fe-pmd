import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderComp } from '../test-util';
import Home from '../../pages/home/index';


jest.mock('../../pages/application/application', () => () => <div>Application Page Main Content</div>)



it('Home has 3 links Application,Customer,Reports', () => {
    const { getByText } = renderComp(Home, '/home');
    getByText("Application");
    getByText("Customer");
    getByText("Reports");
});



it('Home application link should render applicationJS', () => {
    const { getByText, history  } = renderComp(Home, '/home');
    expect(history.location.pathname).not.toBe('/application');
    //click link to application component
    fireEvent.click(getByText("Application"));
    //assertions
    expect(history.location.pathname).toBe('/application');
});




