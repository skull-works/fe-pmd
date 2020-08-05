import React from 'react';
import { fireEvent } from '@testing-library/react';
import TestUtil from '../test-util';


jest.mock('../../pages/application/application', () => () => <div>Application Page Main Content</div>)



it('Home has 3 links Application,Customer,Reports', () => {
    const { getByText } = TestUtil.renderWith('/home');
    getByText("Application");
    getByText("Customer");
    getByText("Reports");
});



it('Home application link should render applicationJS', () => {
    const { container, getByText, history  } = TestUtil.renderWith('/home');
    expect(history.location.pathname).not.toBe('/application');
    //click link to application component
    fireEvent.click(getByText(/application/i));
    //assertions
    expect(history.location.pathname).toBe('/application');
    expect(container.innerHTML).toMatch('Application Page Main Content');
});




