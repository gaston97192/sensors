const { response, request } = require('express');
const jwt = require('jsonwebtoken');



const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        jwt.verify( token, process.env.SECRET_KEY );

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validateJWT
}