# Test data generator

This project allows the user to generate test data. Currently, only CGM data can be generated.

## Installation

This project is built with NodeJS and thus requires NodeJS to be installed. An installer can be downloaded here: https://nodejs.org/en/ . For Windows users: make sure that the node commands are available in your PATH. A minimum Node version required to run the project is 10.x, but 12.x is recommended.

When NodeJS is installed, use a terminal or command prompt and go to the Main folder and execute `npm install` to get all the dependencies installed and prepared. This is also how you execute the next list of commands.


## Usage

In the Config.js you can update startDate,endDate,patientID and backendURL.

Note: When the backendURL is empty, data will not be pushed to the backend.

Use `npm run gen:cgmdata` to generate test data.

Note: After data generation, the data file will be saved in the mockData folder.


## Technology stack

For this project we are using the following libraries and scripts:

* NodeJS (to run our project)
* @faker-js/faker (to generate realistic data and not obvious fake data)
* Moment (for parsing, validating, manipulating, and formatting dates)
* node-fetch (to make API calls)


