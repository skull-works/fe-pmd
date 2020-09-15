exports.addApplicationInputs = {
    first_name: 'testName', 
    area_code: 'AC-01', 
    type_loan: 'NEW', 
    civil_status: 'M', 
};

exports.addApplicationArguments = [
    '/application_form',
    {"body": "{\"first_name\":\"testName\",\"area_code\":\"AC-01\",\"type_loan\":\"NEW\",\"civil_status\":\"M\"}", 
    "headers": {"Content-Type": "application/json"}, 
    "method": "POST"}
];

exports.addApplicationFetchResloveData = {
    type: 'success', 
    subject: 'success',
    name: 'AC-01',
    message: 'Application added succesfuly',
    data: {
        customer: {
            id: 1, 
            first_name: 'testName',
             area_code: 'AC-01'
        },
        application: {
            id:1, 
            first_name: 'testName', 
            area_code: 'AC-01', 
            type_loan: 'NEW', 
            civil_status: 'M', 
            customerId: 1
        },
        spouse: {
            id:1, 
            Sfirst_name:'testSpouseName', 
            customerId: 1
        }
    }
}

exports.addApplicationFetchResloveErrorData = {
    error: {
        subject: "existing", 
        statusCode: 409,
        location: "POST request for applications", 
        message: 'Has an PROCESSING/APPROVED/ONGOING application already, please review applications for this area code'
    }
}

exports.addApplicationFetchResloveErrorDataWithField = {
    error: {
        subject: "existing",
        field: "area_code", 
        statusCode: 409,
        location: "POST request for applications", 
        message: 'already existing'
    }
}


//--------------------------------------




exports.getApplicationsFetchResloveErrorDataWithField = {
    error: {

        errorType: "input validation",
        subject: "input validation",
        location: "get request for applications records",
        field: "area_code",
        message: "Bad input",
        statusCode:  422
    }
}

exports.getApplicationsFetchResloveErrorDataWithOutField = {
    error: {
        errorType: "input validation",
        subject: "input validation",
        location: "get request for applications records",
        message: "Something went wrong",
        statusCode:  422
    }
}

exports.getApplicationFetchResolveSuccessData = [
    {
        id: 1,
        first_name: 'TestFirstName',
        last_name: 'TestLastName',
        area_code: 'TEST-01',
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
    }
]

exports.getApplicationsFetchResolveDataNoData = []

exports.getApplicationsPassedArguments = {
    sample: "sampleLang", 
    start_date: '2020-08-06', 
    end_date: '2020-08-08'
}

exports.getApplicationsFetchExpectedArguments = [
    '/application_form/2020-08-06/2020-08-08?inputs={}',
    {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }
];



//--------------------------------------


exports.getApplicationDetailFetchResolveData = {
        "customer":{
            "id":1, "area_code":"AC-01",
            "first_name":"TestFirstName","last_name":"TestLastName"
        },
        "application":{
            "id":1,"type_loan":"NEW",
            "days_to_pay":58
        },
        "spouse":{
            "id":1,"Sfirst_name":"TestSpouseFirstName",
            "Slast_name":"TestSpouseLastName"
        }
}


exports.getApplicationDetailExpectedFetchArguments = [
    '/application_form-details/AC-01/1',
    { 
        method: 'GET', 
        headers: {'Content-Type': 'application/json'}
    }
]


//-----------

exports.updateApplicationFetchResolveError = {
    name: 'SequelizeDatabaseError'
}

exports.updateApplicationFetchResolveSuccess = {
    type: 'success', 
    message: 'Application'
}

exports.updateApplicationFetchExpectedArgumentsPassed = [
    '/application_form',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: '{"updateType":"both","id":1,"fieldName":"area_code","fieldValue":"TEST-02"}'
    }
]

exports.updateApplicationArgumentToBePassedWithAreaCode = ( tableStore ) => {
    return ([
        {
            updateType: 'both', 
            id: 1, 
            fieldName: 'area_code', 
            fields: { area_code: 'TEST-02'},  //newValue for the field
            tableData: tableStore.tableData,
            areaCode: 'TEST-01'               //WithAreaCode
        },
        tableStore.setTableData,
        tableStore.setApplicationDetails
    ])
}

exports.updateApplicationArgumentToBePassedWithOutAreaCode = ( tableStore ) => {
    return ([
        {
            updateType: 'both', 
            id: 1, 
            fieldName: 'area_code', 
            fields: { area_code: 'TEST-02'},  //newValue for the field
            tableData: tableStore.tableData,
        },
        tableStore.setTableData,
        tableStore.setApplicationDetails
    ])
}