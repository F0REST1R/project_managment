const authService=
require('../services/authService')

const {
generateJWT
}=require('../utils/jwt')

class AuthController{

async register(req,res){

try{

await authService.register(
req.body
)

res.json({

message:
'User registered'

})

}

catch(error){

res.status(400).json({

error:error.message

})

}

}

async login(req,res){

try{

const {
email,
password
}=req.body

const user=
await authService.login(
email,
password
)

const token=
generateJWT(user)

res.json({

token,

user:{

id:user.id,
first_name:user.first_name,
last_name:user.last_name,
email:user.email,
role:user.role

}

})

}

catch(error){

res.status(400).json({

error:error.message

})

}

}

async me(req,res){

const user=
await authService.getUserById(
req.user.id
)

res.json(user)

}

}

module.exports=
new AuthController()