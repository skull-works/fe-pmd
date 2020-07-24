import React from 'react';

const Select = ({label, name, callback, parameters, options}) => {
    return (
            <li className="flex flex-col">
                <label>{label}</label>
                <select onChange={e => callback(e.target, parameters)} className="w-40 rounded-md shadow-inner border focus:border-blue-400 focus:outline-none" name={name} type="text" >
                    <option>---</option>
                    {options.map(o => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
            </li>
    )
}

export default Select;