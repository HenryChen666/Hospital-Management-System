const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBeLaCWv-XsOfO7YhetGERAL_ZCsr9JvcY",
    authDomain: "seg-3102-project.firebaseapp.com",
    databaseURL: "https://seg-3102-project.firebaseio.com",
    projectId: "seg-3102-project",
    storageBucket: "seg-3102-project.appspot.com",
    messagingSenderId: "275420424712",
    appId: "1:275420424712:web:22b29097d9f048ab04ffbd",
    measurementId: "G-J9LR7K1Y6S"
  });
  
var db = firebase.firestore();

var menu =[     {
  "id": 1000,
  "category": "Intensive Care",
  "bipperExt": "7653",
  "chargeNurse": "nurse100",
  "chargeNurseName": "James Lee",
  "location": "Block A",
  "status": "incomplete",
  "telephoneExt":"3000",
  "totalBeds": "61",
  "units": [
    {
      "id": 1010,
      "name": "Neonatal (NICUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 1020,
      "name": "Pediatric (PICUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 1030,
      "name": "Coronary & Cardiothoracic (CCUs/CTUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 1040,
      "name": "Surgical (SICUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "status": "Incomplete",
      "patientArray": [],
      "numOfPatients": 0,
      "numOfStaffMembers": 0,
      "maxPatientCapacity":20,
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 1050,
      "name": "Medical (MICUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 1060,
      "name": "Long Term (LTAC ICUs)",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    }
  ]
},
{
  "id": 2000,
  "category": "Non Intensive Care",
  "bipperExt": "5346",
  "chargeNurse": "nurse200",
  "chargeNurseName": "Ziming Wang",
  "location": "Block B",
  "status": "incomplete",
  "telephoneExt":"2000",
  "totalBeds": "12",
  "units": [
    {
      "id": 2010,
      "name": "Neonatal",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2020,
      "name": "Women & Infant",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2030,
      "name": "Pediatric",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2040,
      "name": "Post-Critical",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2050,
      "name": "Oncology",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2060,
      "name": "Surgical",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2070,
      "name": "Medical",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2080,
      "name": "Rehabilitation",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 2090,
      "name": "Long Term",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    }
  ]
},
{
  "id": 3000,
  "category": "Specialty",
  "bipperExt": "8923",
  "chargeNurse": "nurse300",
  "chargeNurseName": "Kenny Nguyen",
  "location": "Block A",
  "status": "incomplete",
  "telephoneExt":"3000",
  "totalBeds": "61",
  "units": [
    {
      "id": 3010,
      "name": "Burn",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 3020,
      "name": "Oncology",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 3030,
      "name": "Trauma",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    },
    {
      "id": 3040,
      "name": "Neurological",
      "numOfBedsShortTerm": 15,
      "numOfBedsLongTerm": 5,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116"],
      "longTermBedArray": ["1020","1022","1023","1024","1025"]
    }
  ]
},
{
  "id": 4000,
  "category": "Out-Patient-Clinic",
  "bipperExt": "7654",
  "chargeNurse": "nurse300",
  "chargeNurseName": "Henry Cheng",
  "location": "Block D",
  "status": "incomplete",
  "telephoneExt":"4000",
  "totalBeds": "61",
  "units": [
    {
      "id": 4010,
      "name": "Out-Patient",
      "numOfBedsShortTerm": 20,
      "numOfBedsLongTerm": 0,
      "numOfPatients": 0,
      "numOfStaffMembers": 4,
      "maxPatientCapacity":20,
      "status": "Incomplete",
      "patientArray": [],
      "shortTermBedArray": ["1011","1012","1013","1014","1015","1016","1017","1018","1019","1110","1112","1113","1114","1115","1116","1117","1118","1119","1210","1211"],
      "longTermBedArray": []
    }
  ]
}];

menu.forEach(function(obj) {
    db.collection("divisions").add({
        id: obj.id,
        category: obj.category,
        bipperExt: obj.bipperExt,
        chargeNurse: obj.chargeNurse,
        chargeNurseName: obj.chargeNurseName,
        location: obj.location,
        status: obj.status,
        telephoneExt: obj.telephoneExt,
        totalBeds: obj.totalBeds,
        units: obj.units,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});