
//MockData here
//----------------------------------------------


//post passbook data

exports.postPassbookSuccess = {
    success: true,
    message: 'Successfuly Created Passbook',
    passbook: {
        id:1,
        area_code: 'test-01',
        createdAt: '2020-08-28',
        applicationId: 5
    }
}

exports.postPassbookError = {
    error: {
        subject: "application status",
        statusCode: 422,
        message: 'This application already has a passbook, kindly double check'
    }
}

//post passbookItems data

exports.postPassbookItemSuccess = {
    success: true,
    message: 'Payment created successfuly',
    passbookItem: {
        "dates_paid": "2020-09-02T14:08:49.978Z",
        "amount_finance": null,
        "interest_penalty": null,
        "collector_initial": null,
        "remarks": null,
        "id": 8,
        "passbookId": 3,
        "balance": 2800,
        "collection": "200",
        "updatedAt": "2020-09-02T14:08:49.979Z",
        "createdAt": "2020-09-02T14:08:49.979Z"
    }
}

exports.postPassbookItemError = {
    error: {
        subject: "Input validation",
        statusCode: 422,
        message: 'amount_finance Should be Numerice or Decimal value'
    }
}

// get passbookItems data, this is also used in customer-passbook.test.js under content-components

exports.getPassbookItems = {
    "id": 4,
    "pay_type": "DAILY",
    "due_date": null,
    "total": 4560,
    "customer": {
        "id": 41,
        "area_code": "TEST-02",
        "first_name": "TestFname2",
        "last_name": "TestLname2",
        "contact_no": "09990371921"
    },
    "passbook": {
        "id": 2,
        "createdAt": "2020-08-31",
        "passbookItems": [
            {
                "id": 1,
                "dates_paid": "2020-08-30",
                "amount_finance": null,
                "balance": 2800,
                "collection": 200,
                "interest_penalty": null,
                "collector_initial": null,
                "remarks": null
            },
            {
                "id":2,
                "dates_paid": "2020-08-31",
                "amount_finance": null,
                "balance": 2800,
                "collection": 200,
                "interest_penalty": null,
                "collector_initial": null,
                "remarks": null
            }
        ]
    }
}

exports.getPassbookItemsNoItems = {
    "id": 4,
    "pay_type": "DAILY",
    "due_date": null,
    "total": 4560,
    "customer": {
        "id": 41,
        "area_code": "TEST-02",
        "first_name": "TestFname2",
        "last_name": "TestLname2",
        "contact_no": "09990371921"
    },
    "passbook": {
        "id": 2,
        "createdAt": "2020-08-31",
        "passbookItems": []
    }
}

exports.getPassbookItemsError = {
    error: {
        subject: "passbook",
        statusCode: 422,
        message: 'This application has no passbook'
    }
}