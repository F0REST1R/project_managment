const service=
require('../services/employeeService')

class EmployeeController{

async getEmployees(req,res){

const employees=
await service.getAllEmployees()

res.json(
employees
)

}

async createEmployee(req,res){

const employee=
await service.createEmployee(
req.body
)

res.json(
employee
)

}

}

module.exports=
new EmployeeController()