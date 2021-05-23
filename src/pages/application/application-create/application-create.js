import React, { useState } from 'react';

import ApplicationActions from '../../../actions/application';

import authStore from '../../../store/store';

const CreateApplication = () => {
    const authenticateFalseAction = authStore((state) => state.authenticateFalseAction);
    const csrf = authStore((state) => state.csrfToken);
    
    const [type, setType] = useState(null);
    return(
        <>
            <div className="w-9/12 flex flex-col md:flex-row justify-around mx-auto">
                <button className="w-full mt-2 md:w-2/12 h-10 flex flex-wrap content-center justify-center rounded-md bg-gray-800 text-gray-300 focus:outline-none hover:bg-green-400"
                        onClick={() => setType('New')}>
                    New
                </button>
                <button className="w-full mt-2 md:w-2/12 h-10 flex flex-wrap content-center justify-center rounded-md bg-gray-800 text-gray-300 focus:outline-none hover:bg-green-400"
                        onClick={() => setType('Renew')}>
                    Renew/Special
                </button>
            </div>
            <div className="w-9/12 mt-12 flex flex-col md:flex-row justify-around  mx-auto">
                <ApplicationActions.TypeApplication typeloan={type}  csrf={csrf} authenticateFalseAction={authenticateFalseAction} />
            </div>
       </> 
    )
}

export default CreateApplication;