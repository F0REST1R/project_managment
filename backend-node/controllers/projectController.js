const service=
require('../services/projectService')

class ProjectController{

async getProjects(req,res){

const archived=
req.query.archived==="true"

const data=
await service.getProjects(
archived
)

res.json(data)

}

async getProject(req,res){

const data=
await service.getProject(
req.params.id
)

res.json(data)

}

async createProject(req,res){

const project=
await service.createProject(
req.body
)

res.json(project)

}

async updateProject(req,res){

const project=
await service.updateProject(

req.params.id,
req.body

)

res.json(project)

}

async deleteProject(req,res){

await service.deleteProject(
req.params.id
)

res.json({

message:
'Deleted'

})

}

async archiveProject(req,res){

await service.archiveProject(
req.params.id
)

res.json({

message:
'Archived'

})

}

async restoreProject(req,res){

await service.restoreProject(
req.params.id
)

res.json({

message:
'Restored'

})

}

}

module.exports=
new ProjectController()