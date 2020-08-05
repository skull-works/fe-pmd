import React from 'react';
import { fireEvent } from '@testing-library/react';
import TestUtil from '../test-util';

it('UI of create-application content', () => {
    const { getByText } = TestUtil.renderWith('/application?q=CreateApplication');
    getByText('New');
    getByText('Renew/Special');
    getByText('Choose The Type of Application First');
});

it('Click button New then render form application new', () => {
    const { getByText, getByTestId } = TestUtil.renderWith('/application?q=CreateApplication');
    //initial assertions
    getByText('New');
    getByText('Renew/Special');
    getByText('Choose The Type of Application First');
    //click New button
    fireEvent.click(getByText('New'));
    //assertions = should render form application new
    getByText('Customer New');
    expect(getByTestId('info-details').children.length).toEqual(5);
});

it('Click button Renew/Special then render form application Renew/Special', () => {
    const { getByText } = TestUtil.renderWith('/application?q=CreateApplication');
    //initial assertions
    getByText('New');
    getByText('Renew/Special');
    getByText('Choose The Type of Application First');
    //click Renew Button
    fireEvent.click(getByText('Renew/Special'));
    //assertions = should render form application Renew/Special
    getByText('Customer Renew');
});