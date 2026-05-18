const pool=require('../config/db')

class EmployeeService{

async getAllEmployees(){

const result=
await pool.query(

`
SELECT
e.id,
e.user_id,
u.first_name,
u.last_name,
u.email,
u.role,
p.name as position,
e.position_id,
e.hourly_rate,
e.is_active

FROM employees e

JOIN users u
ON e.user_id=u.id

LEFT JOIN positions p
ON p.id=e.position_id
`

)

return result.rows

}

async createEmployee(employee){

const user=
await pool.query(

`
SELECT id
FROM users
WHERE email=$1
`,
[employee.email]

)

if(
user.rows.length===0
){

throw new Error(
'User not found'
)

}

const result=
await pool.query(

`
INSERT INTO employees
(
user_id,
position_id,
hourly_rate,
is_active
)

VALUES
($1,$2,$3,$4)

RETURNING *
`,
[
user.rows[0].id,
employee.position_id,
employee.hourly_rate,
employee.is_active
]

)

return result.rows[0]

}

}

module.exports=
new EmployeeService()