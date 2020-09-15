import React, { useEffect } from 'react';
//layouts
import Header from '../../layout/header/header';
import Navbar from '../../layout/navbar/navbar';
//actions
import CustomerActions from '../../actions/customer';
import { useLocation } from 'react-router-dom';

const Customer = () => {
    const [text, setText] = React.useState('CUSTOMER');
    let { ContentComponent, HeaderText } = CustomerActions;
    let location = useLocation();
    let query = location.search.split("=")[1];

    useEffect(() => {
        HeaderText(query, setText);
    },[query, HeaderText]);

    return(
        <div>
            <Header text={text} title={text}/>
            <div className="h-80vh flex flex-col sm:flex-row">
                <Navbar />
                <div id="content-wrapper" className="h-80vh w-full overflow-auto whitespace-normal bg-gray-200">
                    {/* content here */}
                    <ContentComponent locationQuery={query} />
                </div>
            </div>
        </div>
    )
}

export default Customer;