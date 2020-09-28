import React from 'react';
import GeneralActions from '../actions/general';


const Input = ({label, name, store}) => {
    const {InputChange} = GeneralActions;
    return (
            <li className="flex flex-col">
                {label?<label htmlFor={name}>{label}</label>:''}
                <input  id={name} 
                        data-testid={name}
                        name={name} type="text"
                        onChange={e => InputChange(name, e.target.value, store)} 
                        className=" w-full md:w-24 lg:w-40 h-7 rounded-md shadow-inner border focus:border-blue-400 focus:outline-none"/>
            </li>
    )
}


export default Input;