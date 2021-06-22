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
  Route.post('/create', 'PersonController.createPerson') //Only return the person's code
  Route.get('/show', 'PersonController.showPerson') //Return the person's data
  Route.get('/showpeople', 'PersonController.showPeople') //Return all persons data
  Route.put('/update', 'PersonController.updatePerson') //Update the data
  Route.delete('/destroy', 'PersonController.destroyPerson') //Delete the person
}).prefix('/Person')

Route.group(() => {
  Route.post('/create', 'UserController.createUser') //Only return the user's code
  Route.get('/show', 'UserController.showUser') //Return the user's data
  Route.get('/showusers', 'UserController.showUsers') //Return all users data
  Route.put('/update', 'UserController.updateUser') //Update the data
  Route.delete('/destroy', 'UserController.destroyUser') //Delete the user
}).prefix('/User')

Route.group(() => {
  Route.post('/create', 'EmployeeController.createEmployee') //Only return the employee's code
  Route.get('/show', 'EmployeeController.showEmployee') //Return the employee's data
  Route.get('/showemployees', 'EmployeeController.showEmployees') //Return all employees data
  Route.put('/update', 'EmployeeController.updateEmployee') //Update the data
  Route.delete('/destroy', 'EmployeeController.destroyEmployee') //Delete the employee
}).prefix('/Employee')

Route.group(() => {
  Route.post('/create', 'MemberController.createMember') //Only return the member's code
  Route.get('/show', 'MemberController.showMember') //Return the member's data
  Route.get('/showmembers', 'MemberController.showMembers') //Return all members data
  Route.put('/update', 'MemberController.updateMember') //Update the data
  Route.delete('/destroy', 'MemberController.destroyMember') //Delete the member
}).prefix('/Member')



