import React from 'react';
//controllers
import ApplicationController from '../../../../controllers/application';
//elements
import Button from '../../../../elements/button';

const ApplicationTable = ({tableData, setApplicationDetails}) => {
    return (
        <div id="table-wrapper">
                <table className="w-full">
                    <thead>
                        <tr id="table-header" className="h-12 bg-gray-300">
                            <th>FORM ID</th>
                            <th>NAME</th>
                            <th>AREA CODE</th>
                            <th>STATUS</th>
                            <th>DATE ISSUED</th>
                            <th>CREATOR</th>
                            <th>REVIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(i => (
                            <tr key={i.id} className="text-center h-12 font-semibold hover:bg-gray-300">
                                <td>{i.id}</td>
                                <td>{i.first_name} {i.last_name}</td>
                                <td>{i.area_code}</td>
                                <td>{i.status}</td>
                                <td>{i.date_issued.split('T')[0]}</td>
                                <td>{i.created_by}</td>
                                <td><Button label="Review" callback={ApplicationController.getApplicationDetail} parameters={{area_code: i.area_code, formId:i.id, setApplicationDetails:setApplicationDetails}} /></td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
            )
}

export default ApplicationTable;