const {token} = require('../config/environment')
const Auth = (req, res, next) => {
    const bearer = req.headers['authorization'];
    try 
    {
        let reqToken = bearer.split(" ")[1];

        if (!reqToken) {
            return res.status(403).send({
                message: "Error obteniendo el token"
            });
        }
    
        if(reqToken && reqToken == token){ //Insert the token here
            next();
        } else {
           return res.status(403).send({
                message: "El token es incorrecto"
            });
        }
    } catch (error){
        return res.status(403).send({
            message: "No ha sido provehido el token"
        });
    }  
};


module.exports = Auth;
