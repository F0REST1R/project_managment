require('dotenv').config()

const express=
require('express')

const cors=
require('cors')

const authRoutes=
require('./routes/authRoutes')

const app=
express()

const projectRoutes=require('./routes/projectRoutes')
const employeeRoutes=require('./routes/employeeRoutes')
const clientRoutes=require('./routes/clientRoutes')

app.use('/api/projects',projectRoutes)
app.use('/api/employees',employeeRoutes)
app.use('/api/clients',clientRoutes)

app.use(cors())

app.use(express.json())

app.use(
'/api/auth',
authRoutes
)

app.get(
'/health',
(req,res)=>{

res.json({

status:'OK'

})

}
)

app.listen(

process.env.PORT,

()=>{

console.log(

`Server started:
${process.env.PORT}`

)

})