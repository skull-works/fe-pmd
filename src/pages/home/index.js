import React from 'react';
import { Link } from 'react-router-dom';
//layouts
import Header from '../../layout/header/header';

const Home = () => {
    return (
        <>
            <Header text="PMD PORTAL" title="PMD PORTAL" />
            <div id="content-wrapper">
                <div className="w-8/12 pt-20 mx-auto text-gray-200 flex flex-col md:flex-row justify-around">
                    <Link to="/application" className="h-20 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                        Application
                    </Link>
                    <Link to="/customer" className="h-20 mt-2 md:mt-0 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                        Customer
                    </Link>
                    <Link  to="/reports" className="h-20 mt-2 md:mt-0 md:w-2/12 md:h-32 flex content-center justify-center flex-wrap rounded-md hover:bg-green-500 bg-gray-800">
                        Reports
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;