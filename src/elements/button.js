import React from 'react';


const Button = ({label, callback, parameters, position}) => {
    return (
        <button type="button" className={`${position} w-40 mt-4 rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500`}
                                              onClick={() => callback(parameters)}>
                           {label}
        </button>
    )
}

export default Button;