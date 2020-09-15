import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
//layouts
import Header from '../../layout/header/header';
import Navbar from '../../layout/navbar/navbar';
//actions
import ApplicationActions from '../../actions/application';


const Application = () => {
    const [text, setText] = useState('APPLICATIONS');
    let location = useLocation();

    useEffect(() => {
        ApplicationActions.HeaderText(location.search.split("=")[1], setText);
    },[location.search])

    return (
        <>
            <Header text={text} title="Applications"/>
            <div className="h-80vh flex flex-col sm:flex-row">
                <Navbar />
                <div id="content-wrapper" className="h-80vh w-full overflow-auto whitespace-normal bg-gray-200">
                    {/* content here */}
                    <ApplicationActions.ContentComponent location={location.search.split("=")[1]} />
                </div>
            </div>
        </>
    )
}


export default Application;
