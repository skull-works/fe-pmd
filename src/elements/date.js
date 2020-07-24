import React from 'react';

const Date = ({label, name, callback, parameters}) => {
    return (
            <li className="flex flex-col">
                <label>{label}</label>
                <input type="date"  name={name} onChange={e => callback(e.target, parameters)} className="border h-7 rounded-md focus:outline-none focus:border-blue-500"/>
            </li>
    )
}

export default Date;