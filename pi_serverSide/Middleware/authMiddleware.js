const jwt = require("jsonwebtoken");
SCRETE_KEY=process.env.SECRET_KEY

const verifyToken=(req,res,next)=>{
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
      }
      console.log(req.headers.authorizations,"fgsdfgwretwrtwert==============");
      const token= req.headers["authorization"].split(" ")[1]
      if(!token){
          return res.json({message:"Access denied , no token is provide"})
        }
        try{
          console.log(token,'oooooooooooooooooooooooooos');
          console.log(SCRETE_KEY,'SCRETE_KEY');

          const decoded=jwt.verify(token,SCRETE_KEY)
           req.decoded=decoded
           next()
      }catch(err){
        return res.json({message:"invalid token"})
      }
}

module.exports=verifyToken