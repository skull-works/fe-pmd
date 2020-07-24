import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
         <div id="content-wrapper">
                <div className="w-8/12 pt-20 mx-auto text-gray-200 flex flex-col md:flex-row justify-around">
                        <Link to="/application" className="h-20 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                            <span>Application</span>
                        </Link>
                        <Link to="/customer" className="h-20 mt-2 md:mt-0 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                            <span>Customer</span>
                        </Link>
                        <Link  to="/reports" className="h-20 mt-2 md:mt-0 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                            <span>Reports</span>
                        </Link>
                </div>
        </div>
    )
}

export default Home;