const jwt = require('jsonwebtoken');



const generarJWT = () => {

    return new Promise( (resolve, reject) => {

        const payload = {};

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = {
    generarJWT
}