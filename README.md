## Product Availability Web API 
###### Alex Housand

### Requirements/Dependencies
1. Node.js - version 6.9.0 or higher can be downloaded here: https://nodejs.org/en/download/
2. Express - version 4.15.2
3. MongoDB

#### Installation
1) Clone this repository.
2) Run `npm install`
3) Start the project with `npm run start`
4) Open a web browser and navigate to http://localhost:8000

If the above does not work try following the steps below:

5) Navigate to the folder you have saved this repository in the command line/terminal.
  -run `npm install express --save`
  -run `npm install mongodb --save`
6) Run `npm run start`
7) Open a web broswer and navigate to http://localhost:8000

#### Using the API
1) http://localhost:8000/productsSearch will return all the products
2) http://localhost:8000/productsSearch/yyyy-mm-dd will return the products available on the date (date can also be entered in mm-dd-yyyy format)
3) http://localhost:8000/productsSearch/yyyy-mm-dd/productName will return that particular product if it is available on the date entered 
