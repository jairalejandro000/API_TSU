'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() => {
  Route.post('/signup', 'PersonController.createPerson') //Only return the person's code
  Route.get('/show/:code', 'PersonController.showPerson') //Return the person's data
  Route.get('/showpeople', 'PersonController.showPeople') //Return all persons data
  Route.put('/update/:code', 'PersonController.updatePerson') //Update the data
  Route.delete('/delete/:code', 'PersonController.destroyPerson') //Delete the person
}).prefix('/Person')

Route.group(() => {
  Route.post('/create', 'UserController.createUser') //Only return the user's code
  Route.get('/show/:code', 'UserController.showUser') //Return the user's data
  Route.get('/showusers', 'UserController.showUsers') //Return all users data
  Route.put('/update/:code', 'UserController.updateUser') //Update the data
  Route.delete('/delete/:code', 'UserController.destroyUser') //Delete the user
}).prefix('/User')

Route.group(() => {
  Route.post('/signup', 'EmployeeController.createEmployee') //Only return the employee's code
  Route.get('/show/:code', 'EmployeeController.showEmployee') //Return the employee's data
  Route.get('/showemployees', 'EmployeeController.showEmployees') //Return all employees data
  Route.put('/update/:code', 'EmployeeController.updateEmployee') //Update the data
  Route.delete('/delete/:code', 'EmployeeController.destroyEmployee') //Delete the employee
}).prefix('/Employee')

Route.group(() => {
  Route.post('/create', 'MemberController.createMember') //Only return the member's code
  Route.get('/show/:code', 'MemberController.showMember') //Return the member's data
  Route.get('/showmembers', 'MemberController.showMembers') //Return all members data
  Route.put('/update/:code', 'MemberController.updateMember') //Update the data
  Route.delete('/delete/:code', 'MemberController.destroyMember') //Delete the member
}).prefix('/Member')

Route.group(() => {
  Route.post('/create', 'LoanController.createLoan') //Only return the loan's code
  Route.get('/show/:code', 'LoanController.showLoan') //Return the loan's data
  Route.get('/showloans', 'LoanController.showLoans') //Return all loans data
  Route.put('/update/:code', 'LoanController.updateLoan') //Update the data
  Route.delete('/delete/:code', 'LoanController.destroyLoan') //Delete the loan
}).prefix('/Loan')

Route.group(() => {
  Route.post('/create', 'GolfCarController.createGolfCar') //Only return the golfcar's code
  Route.get('/show/:code', 'GolfCarController.showGolfCar') //Return the golfcar's data
  Route.get('/showgolfcars', 'GolfCarController.showGolfCars') //Return all golfcars data
  Route.put('/update/:code', 'GolfCarController.updateGolfCar') //Update the data
  Route.delete('/delete/:code', 'GolfCarController.destroyGolfCar') //Delete the golfcar
}).prefix('/GolfCar')

Route.group(() => {
  Route.post('/create', 'ExtensionController.createExtension') //Only return the extension's code
  Route.get('/show/:code', 'ExtensionController.showExtension') //Return the extension's data
  Route.get('/showextensions', 'ExtensionController.showExtensions') //Return all extensions data
  Route.put('/update/:code', 'ExtensionController.updateExtension') //Update the data
  Route.delete('/delete/:code', 'ExtensionController.destroyExtension') //Delete the extension
}).prefix('/Extension')

Route.group(() => {
  Route.post('/create', 'PersonRolController.createPersonRol') //Only return the personrol's code
  Route.get('/show/:code', 'PersonRolController.showPersonRol') //Return the personrol's data
  Route.get('/showpersonrols', 'PersonRolController.showPersonRols') //Return all personrols data
  Route.put('/update/:code', 'PersonRolController.updatePersonRol') //Update the data
  Route.delete('/delete/:code', 'PersonRolController.destroyPersonRol') //Delete the personrol
}).prefix('/PersonRol')

Route.group(() => {
  Route.post('/create', 'AreaController.createArea') //Only return the area's code
  Route.get('/show/:code', 'AreaController.showArea') //Return the area's data
  Route.get('/showareas', 'AreaController.showAreas') //Return all areas data
  Route.put('/update/:code', 'AreaController.updateArea') //Update the data
  Route.delete('/delete/:code', 'AreaController.destroyArea') //Delete the area
}).prefix('/Area')






