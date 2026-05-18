const service=
require('../services/clientService')

class ClientController{

async getClients(req,res){

const clients=
await service.getClients()

res.json(
clients
)

}

async createClient(req,res){

const client=
await service.createClient(
req.body
)

res.json(
client
)

}

}

module.exports=
new ClientController()