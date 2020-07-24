import React from 'react';

const Input = ({label, name, callback, parameters}) => {
    return (
            <li className="flex flex-col">
                {label?<label>{label}</label>:''}
                <input onChange={e => callback(e.target, parameters)} className=" w-full md:w-40 h-7 rounded-md shadow-inner border focus:border-blue-400 focus:outline-none" name={name} type="text" />
            </li>
    )
}

export default Input;