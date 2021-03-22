const { response, request } = require('express');
const {generarJWT} = require('../helpers/generateToken');
const jwt = require('jsonwebtoken');


const generateToken = async(req = request, res = response) => {

    const token = await generarJWT();

    res.json({
        data: token
    });
}

const validateToken = async(req = request, res = response) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
 
    try {
        jwt.verify( token, process.env.SECRET_KEY );

        return res.status(200).json({
            data: true
        });
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    generateToken,
    validateToken
}