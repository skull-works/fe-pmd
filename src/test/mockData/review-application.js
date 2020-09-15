exports.arrCompleteLabel = [
    "First name:", 
    "Last name:", 
    "Loan type:",
    "Status:",
    "From:",
    "to:"
];

exports.arrCompleteValue = [
    "TestFirstname", 
    "TestLastname", 
    "NEW", 
    "PROCESSING", 
    "2020-08-06", 
    "2020-08-08"
];

exports.arrCompleteField = [
    "first_name", 
    "last_name", 
    "type_loan",
    "status",
    "start_date",
    "end_date"
];

exports.expectedCompleteArguments = {
    "end_date": "2020-08-08", 
    "first_name": "TestFirstname", 
    "last_name": "TestLastname", 
    "start_date": "2020-08-06", 
    "status": "PROCESSING", 
    "type_loan": "NEW"
}


//-------


exports.arrDatesLabel = [
    "From:",
    "to:"
];

exports.arrDatesValue = [
    "2020-08-06", 
    "2020-08-08"
];

exports.arrDatesField = [
    "start_date",
    "end_date"
];

exports.expectedDatesArguments = {
    "end_date": "2020-08-08",
    "start_date": "2020-08-06", 
}

export const getApplicationFetchResolveSuccessData = jest.fn(() => {
    return [
        {
            id: 1,
            first_name: 'TestFirstName1',
            last_name: 'TestLastName1',
            area_code: 'TEST-01',
            status: 'PROCESSING',
            date_issued: '2020-08-06',
            created_by: 'TestAdmin'
        },
    
        {
            id: 2,
            first_name: 'TestFirstName2',
            last_name: 'TestLastName2',
            area_code: 'TEST-02',
            status: 'PROCESSING',
            date_issued: '2020-08-06',
            created_by: 'TestAdmin'
        }
    ]
});


//-------


exports.getApplicationDetailFetchResolveData = {
    "customer":{
        "id":1, "area_code":"TEST-01",
        "first_name":"Marco Theo","last_name":"Butalid",
        "birth_date":"2020-07-01","age":22, "contact_no":"09990371921",
        "street_address":"6g matiga street","barangay":"poblacioin 1","city":"Tagbilaran City","province":"Bohol",
        "religion":"Catholic", "nationality":"Filipino",
        "source_of_income":"nonenone","length_of_service":"2 years",
        "length_of_stay":"2 years","occupation":"Jobless","civil_status":"M"
    },
    "application":{
        "id":1,"type_loan":"NEW",
        "days_to_pay":58,"amount_loan":2000,
        "pay_type":"DAILY","pay_breakdown":60,
        "mnths_to_pay":1,"total":2280,"date_issued":"2020-07-19",
        "due_date":null,"status":"APPROVED",
        "created_by":"user","proc_fee":100,"remarks":null
    },
    "spouse":{
        "id":1,"Sfirst_name":"NONEEEE",
        "Slast_name":"zxcasdasd","Sbirth_date":"2020-07-04",
        "Sstreet_address":"asdasd","Sbarangay":"asda",
        "Scity":"asdasdasd","Sprovince":"asdasda",
        "Sreligion":"asdasdasd","Ssource_of_income":"asdasdasd","Snationality":"asdasdada",
        "Scontact_no":"99090123",
        "createdAt":null,"updatedAt":"2020-07-23T18:09:40.000Z","customerId":1
    }
}


//-------


exports.updateApplicationExpectedArgumentAreaCode = {
    updateType: 'both',
    id: 1,
    fieldName: 'area_code',
    fields: { area_code: 'TEST-04' },
    tableData: [
      {
        id: 1,
        first_name: 'TestFirstName1',
        last_name: 'TestLastName1',
        area_code: 'TEST-04',                     // original value should TEST-01 because TEST-04 will be new value instead refer to areaCode field for the original value
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      },
      {
        id: 2,
        first_name: 'TestFirstName2',
        last_name: 'TestLastName2',
        area_code: 'TEST-02',
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      }
    ],
    areaCode: 'TEST-01',                          // this is original value of tableData area_code 1st object
    fieldValue: 'TEST-04'                         // this should not be here due to mock calls when dealing with object arguments it records the reference instead of a copy of that object during that call
}

exports.updateApplicationExpectedArgumentFirstName = {
    updateType: 'both',
    id: 1,
    fieldName: 'first_name',
    fields: { first_name: 'TestFirstName4' },   
    tableData: [
      {
        id: 1,
        first_name: 'TestFirstName4',         // original value should TestFirstName1 because TestFirstName4 will be new value instead refer to areaCode field for the original value
        last_name: 'TestLastName1',
        area_code: 'TEST-01',                     
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      },
      {
        id: 2,
        first_name: 'TestFirstName2',
        last_name: 'TestLastName2',
        area_code: 'TEST-02',
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      }
    ],
    areaCode: 'TEST-01',                          
    fieldValue: 'TestFirstName4'                  // this should not be here due to mock calls when dealing with object arguments it records the reference instead of a copy of that object during that call
}

exports.updateApplicationExpectedArgumentLasName = {
    updateType: 'both',
    id: 1,
    fieldName: 'last_name',
    fields: { last_name: 'TestLastName4' },   
    tableData: [
      {
        id: 1,
        first_name: 'TestFirstName1',         
        last_name: 'TestLastName4',               // original value should TestLastName1 because TestLastName4 will be new value instead refer to areaCode field for the original value
        area_code: 'TEST-01',                     
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      },
      {
        id: 2,
        first_name: 'TestFirstName2',
        last_name: 'TestLastName2',
        area_code: 'TEST-02',
        status: 'PROCESSING',
        date_issued: '2020-08-06',
        created_by: 'TestAdmin'
      }
    ],
    areaCode: 'TEST-01',                          
    fieldValue: 'TestLastName4'                  // this should not be here due to mock calls when dealing with object arguments it records the reference instead of a copy of that object during that call
}

exports.updateApplicationFetchResolveSuccess = {
    type: 'success', 
    message: 'Application'
}