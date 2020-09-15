import React from 'react';
import GeneralActions from '../actions/general';

const Select = ({label, name, options, store}) => {
    const {InputChange} = GeneralActions;
    return (
            <li className="flex flex-col">
                <label htmlFor={name}>{label}</label>
                <select id={name}
                        name={name} 
                        type="text"
                        onChange={e => InputChange(name, e.target.value, store)} 
                        className="w-40 rounded-md shadow-inner border focus:border-blue-400 focus:outline-none">
                    <option>---</option>
                    {options.map(o => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
            </li>
    )
}

export default Select;