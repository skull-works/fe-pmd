import React from 'react';
import { Link } from 'react-router-dom';

const MainApplication = () => {
    return (
        <div id="link-wrapper" className="md:w-4/12 h-48  pt-24 sm:text-md md:text-xl text-gray-300 mx-auto">
            <Link to="/application?q=CreateApplication"  className="w-full h-20 rounded-full flex flex-wrap content-center justify-center bg-gray-800 hover:bg-green-500">
                Create Application
            </Link>
            <Link to="/application?q=ReviewApplications" className="w-full mt-8 h-20 rounded-full flex flex-wrap content-center justify-center bg-gray-800 hover:bg-green-500">
                Review Applications
            </Link>
        </div>
    )
}

export default MainApplication;