import React from 'react';


const Button = ({label, callback, args, position}) => {
    return (
        <button type="button" 
                className={`${position} rounded-md border-2 text-green-500 border-green-500 focus:outline-none hover:text-gray-200 hover:bg-green-500`}
                onClick={() => callback(...args)}>
                           {label}
        </button>
    )
}

export default Button;