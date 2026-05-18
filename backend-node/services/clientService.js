const pool=require('../config/db')

class ClientService{

async getClients(){

const result=
await pool.query(

`
SELECT *
FROM clients
ORDER BY id DESC
`

)

return result.rows

}

async createClient(client){

const result=
await pool.query(

`
INSERT INTO clients
(
company_name,
contact_name,
email,
phone
)

VALUES
($1,$2,$3,$4)

RETURNING *
`,
[
client.company_name,
client.contact_name,
client.email,
client.phone
]

)

return result.rows[0]

}

}

module.exports=
new ClientService()