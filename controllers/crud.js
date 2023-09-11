const conexion = require('../conexion/db');

exports.save= (req, res)=>{
    const usuario = req.body.usuario;
    const pass = req.body.pass;
    const rol = req.body.rol;
    const values = [usuario, pass, rol];
    conexion.query('INSERT INTO users (usuario, pass, rol) VALUES ($1,$2,$3)',values, (error, results)=>{
        if(error){
            console.log('El error de conexión es: ',error);
        }else{
            res.redirect('/');
        }
    })
}

exports.update = (req, res) => {
    const id = req.body.id;
    const usuario = req.body.usuario;
    const pass = req.body.pass;
    const rol = req.body.rol;

    conexion.query('UPDATE users SET usuario = $1, pass = $2, rol = $3 WHERE id = $4', [usuario, pass, rol, id], (error, results) => {
        if (error) {
            console.log('El error de conexión es: ', error);
        } else {
            res.redirect('/');
        }
    });
}


