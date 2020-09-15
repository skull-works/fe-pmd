import React from 'react';
import GeneralActions from '../actions/general';

const Date = ({label, name, store}) => {
    const {InputChange} = GeneralActions;
    return (
            <li className="flex flex-col">
                <label htmlFor={name}>{label}</label>
                <input type="date"
                       id={name}  
                       name={name} 
                       onChange={e => InputChange(name, e.target.value, store)} 
                       className="border h-7 rounded-md focus:outline-none focus:border-blue-500"/>
            </li>
    )
}

export default Date;