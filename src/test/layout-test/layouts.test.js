import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../../layout/header/header';
import Navbar from '../../layout/navbar/navbar';

it('Header Page has Title and header text', () => {
    const { getByTitle, getByText } = render(<Header text="Test" title="TitleTest" />);
    const title = getByTitle("TitleTest");
    const text = getByText("Test");
    title;
    expect(title.nodeName).toBe('TITLE');
    text;
    expect(text.nodeName).toBe('H1');
});


describe("Navbar layout", () => {
    it('Navbar Links should have Home,Application,Customer,Reports,Logout', () => {
        const {getByText} = render(
            <Router>
                    <Navbar />
            </Router>
        );
        getByText("Home");
        getByText("Application");
        getByText("Customer");
        getByText("Reports");
        getByText("Logout");
    });

    it('Navbar button render navbar when clicked', () => {
        const {getByTestId} = render(
            <Router>
                    <Navbar />
            </Router>
        );
        //navbar is hidden
        getByTestId("navbar-wrapper");
        expect(getByTestId("navbar").className).toContain("hidden");
        //click button to render navbar
        fireEvent.click(getByTestId("nav-button"));
        //show navbar
         expect(getByTestId("navbar").className).toContain("block");
        //  expect(getByTestId("navbar").classList
    });
});
