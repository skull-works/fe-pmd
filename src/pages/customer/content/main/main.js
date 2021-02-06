import React from 'react';
import { Link } from 'react-router-dom';
import { IsUserStillLoggedIn } from '../../../mainHooks/AuthHooks';

const MainCustomer = () => {
    IsUserStillLoggedIn();
    let boxCss = 'w-full h-20 rounded-full flex flex-wrap content-center justify-center bg-gray-800 hover:bg-green-500';
    return (
        <div id="link-wrapper" className="md:w-4/12 h-48  pt-24 sm:text-md md:text-xl text-gray-300 mx-auto">
            <Link to="/customer?q=Passbook"  className={`${boxCss}`}>
                Passbook
            </Link>
            <Link to="/customer?q=PassbookHistory" className={`${boxCss} mt-8`}>
                Customer Passbook Histories
            </Link>
        </div>
    )
}

export default MainCustomer;