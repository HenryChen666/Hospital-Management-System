# Yellow Jackets

## Built With
* [Angular]
* [Spring-Boot]
* [Firebase]

## Installation

Please start the server side first and wait until it's fully loaded then start the frontend.

To get the backend running locally:

- Clone this repo
- navigate to /backend directory
- `./gradlew bootRun` to run the Spring Boot Server

To get the frontend running locally:

- Clone this repo
- navigate to /frontend directory
- `npm install` to install all required dependencies 
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 4200. You can configure port in scripts section of `./frontend/package.json`

### Default Users

The users below are default users and the nurse's below are all charge nurses therefore facilitating that you do not have to register a whole bunch of users to test the application.

Doctor100
```
username: doctor100
password: doctor
```

Doctor200
```
username: doctor200
password: doctor
```

Doctor300
```
username: doctor300
password: doctor
```

Nurse100
```
username: nurse100
password: nurse
```

Nurse200
```
username: nurse200
password: nurse
```

Nurse300
```
username: nurse300
password: nurse
```

Other user type roles need to be registered manuallly

### Divisions/Wards

ALL FUNCTIONAL REQUIREMENTS COMPLETED - Below are more in depth description in case a functional requirement is not obvious and how you can trigger them.

The application contains 3 different Divisions - Specialty, Intensive Care, and Non Intensive Care.

Each Division has their own set of Units(sub-divisions) which is managed by the Division Charge Nurse who is responsible for these Units.

Each Unit has their own set amount of beds, and the Division total bed count is an accumulation of all the beds for each Unit of that Division.

### F3.1, F3.2, F3.3 Requirement: Status of a Division Section / Unit.

Once the Short Term Beds and Long Term Beds for a Division Section / Unit reaches 0, the status will go to "complete" from "incomplete"

You can test this out by pressing the down button for "Short Term Beds Available" AND "Long Term Beds Available" to 0 for a "Unit", the status header of the table for the Unit will change.

### F3.1, F3.2, F3.3 Requirement: Bed Count for Division Section / Unit.

The bed count when adjusted, will adjust dynamically for a unit.

The bed count for overall division will change once reselected if bed count did change.

### F3.4 Requirment: Division Charge Nurse.

A Division has it's own telephone ext. The Charge nurse will be assigned to that telephone ext, and the Charge nurse's Bipper ext. assigned to that Division.

### F9 Requirement: Preventing Patient Admission to a 'Complete' Division.

When a Division or its Unit(sub-division) is complete, in the Request Patient Admission dialogs, it will show those 'Complete' Division and Units as a disabled option so the user will not be able to select it.

This will prevent a Patient from being admitted to a Division or Unit that is 'Complete'.
