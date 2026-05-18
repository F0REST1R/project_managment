const pool=require('../config/db')

class ProjectService{

async getProjects(archived=false){

const result=await pool.query(

`
SELECT *
FROM projects
WHERE archived=$1
ORDER BY id DESC
`,
[archived]

)

return result.rows

}

async getProject(id){

const result=await pool.query(

`
SELECT *
FROM projects
WHERE id=$1
`,
[id]
)

return result.rows[0]

}

async createProject(project){

const result=await pool.query(

`
INSERT INTO projects
(
name,
client_id,
manager_id,
status,
start_date,
end_date
)

VALUES
($1,$2,$3,$4,$5,$6)

RETURNING *
`,
[
project.name,
project.client_id,
project.manager_id,
project.status,
project.start_date,
project.end_date
]

)

return result.rows[0]

}

async updateProject(id,project){

const result=await pool.query(

`
UPDATE projects
SET

name=$1,
client_id=$2,
manager_id=$3,
status=$4,
start_date=$5,
end_date=$6

WHERE id=$7

RETURNING *
`,
[
project.name,
project.client_id,
project.manager_id,
project.status,
project.start_date,
project.end_date,
id
]

)

return result.rows[0]

}

async deleteProject(id){

await pool.query(

`
DELETE FROM projects
WHERE id=$1
`,
[id]

)

}

async archiveProject(id){

await pool.query(

`
UPDATE projects
SET archived=true
WHERE id=$1
`,
[id]

)

}

async restoreProject(id){

await pool.query(

`
UPDATE projects
SET archived=false
WHERE id=$1
`,
[id]

)

}

}

module.exports=new ProjectService()