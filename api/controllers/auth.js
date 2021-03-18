const { response, request } = require('express');
const {generarJWT} = require('../helpers/generateToken');

const generateToken = async(req = request, res = response) => {

    const token = await generarJWT();

    res.json({
        data: token
    });
}

module.exports = {
    generateToken
}