import React from 'react';


const CustomerInfo = ({details}) => {
    let lineWidth = 'w-6/12';
    let lineWidth2 = 'w-6/12'
    return(
            <div className="flex flex-col">
                <div className="text-center font-semibold lg:text-lg">
                    <h1>CUSTOMER INFORMATION</h1>
                </div>
                {details?
                    <div className="customerInformation flex flex-row md:text-sm lg:text-lg">
                            <div className="w-6/12">
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>First Name:  </p> 
                                    <p className={`${lineWidth2}`}>{details.customer.first_name}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Last Name:   </p> 
                                    <p className={`${lineWidth2}`}>{details.customer.last_name}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Form ID:     </p> 
                                    <p className={`${lineWidth2}`}>{details.id}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Pay Type:    </p> 
                                    <p className={`${lineWidth2}`}>{details.pay_type}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Area Code:   </p> 
                                    <p className={`${lineWidth2}`}>{details.customer.area_code}</p></div>
                            </div>
                            <div className="w-6/12">
                                 <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>No#:         </p> 
                                    <p className={`${lineWidth2}`}>{details.customer.contact_no}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Date release:  </p> 
                                    <p className={`${lineWidth2}`}>{details.passbook.createdAt}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Due date:      </p> 
                                    <p className={`${lineWidth2}`}>{details.due_date}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Passbook No.:  </p> 
                                    <p className={`${lineWidth2}`}>{details.passbook.id}</p></div>
                                <div className="flex flex-row pt-2"><p className={`${lineWidth} w-20 text-right text-blue-500`}>Total Balance: </p> 
                                    <p className={`${lineWidth2}`}>{details.total}</p></div>
                            </div>
                    </div>
                    :
                    <h1 className="text-center">SEARCH FOR PAYMENTS BY ENTERING FORM ID</h1>
                }
            </div>
    );
}

export default CustomerInfo;