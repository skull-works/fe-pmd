exports.getData = {
    "allDates": [
      "2020-09-20",
      "2020-09-21",
      "2020-09-22",
      "2020-09-23"
    ],
    "customerPayments": [
      {
        "id": 3,
        "area_code": "TEST-01",
        "first_name": "TestFname1",
        "last_name": "TestLname1",
        "type_loan": "SP",
        "customer": {
          "contact_no": "09990371921"
        },
        "passbook": {
          "id": 5,
          "passbookitems": [
            {
              "id": 26,
              "dates_paid": "2020-09-22",
              "collection": 3500
            }
          ]
        }
      },
      {
        "id": 4,
        "area_code": "TEST-02",
        "first_name": "TestFname2",
        "last_name": "TestLname2",
        "type_loan": "NEW",
        "customer": {
          "contact_no": "09990371921"
        },
        "passbook": {
            "id": 6,
            "passbookitems": [
              {
                "id": 27,
                "dates_paid": "2020-09-22",
                "collection": 3500
              }
            ]
          }
      },
      {
        "id": 5,
        "area_code": "TEST-03",
        "first_name": "TestFname3",
        "last_name": "TestLname3",
        "type_loan": "NEW",
        "customer": {
          "contact_no": "09990371222"
        },
        "passbook": {
            "id": 7,
            "passbookitems": [
              {
                "id": 28,
                "dates_paid": "2020-09-22",
                "collection": 3500
              }
            ]
          }
      }
    ]
  }


  exports.getDataDoublePayment = {
    "allDates": [
      "2020-09-20",
      "2020-09-21",
      "2020-09-22",
      "2020-09-23"
    ],
    "customerPayments": [
      {
        "id": 3,
        "area_code": "TEST-01",
        "first_name": "TestFname1",
        "last_name": "TestLname1",
        "type_loan": "SP",
        "customer": {
          "contact_no": "09990371921"
        },
        "passbook": {
          "id": 5,
          "passbookitems": [
            {
              "id": 26,
              "dates_paid": "2020-09-22",
              "collection": 200
            },
            {
              "id": 27,
              "dates_paid": "2020-09-22",
              "collection": 200
            }
          ]
        }
      },
    ]
  }