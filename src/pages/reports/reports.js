import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//layout
import Header from '../../layout/header/header';
import Navbar from '../../layout/navbar/navbar';
//actions
import ReportsActions from '../../actions/reports';


const Reports = () => {
    const [text, setText] = React.useState('REPORTS');
    const location = useLocation();
    const { HeaderText, ContentComponent } = ReportsActions;
    var query = location.search.split("=")[1];

    useEffect(() => {
        HeaderText(query, setText);
    },[query, HeaderText]);

    return(
        <Fragment>
            <Header text={text} title={text}/>
            <div className="h-80vh flex flex-col sm:flex-row">
                    <Navbar />
                    <div id="content-wrapper" className="h-80vh w-full overflow-auto whitespace-normal bg-gray-200">
                        {/* content here */}
                        <ContentComponent locationQuery={query} />
                    </div>
            </div>
        </Fragment>
    );
}

export default Reports;