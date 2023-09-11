const express = require ('express');
const router = express.Router();
const pool = require('../conexion/db');

//ANCHOR - Obtener los registros de la BD
router.get('/', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id', (error, results) => {
        if (error) {
            throw error;
        } else {
            // Envía los resultados como JSON
            res.render('index', {users: results.rows})
        }
    });
});

//ANCHOR - Crear nuevo registro
router.get('/create', (req, res) => {
    res.render('create');
});


//ANCHOR - Editar un registro
router.get('/edit/:id',(req,res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error;
        } else {
            // Envía los resultados como JSON
            res.render('edit', {users: results.rows[0]})
        }
    });
})

//ANCHOR - Eliminar registro
router.get('/delete/:id',(req,res) => {
    const id = req.params.id;
    pool.query('DELETE FROM users WHERE id = $1',[id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/')
        }
    });
})

router.get('/search', (req, res) => {
    const texto = req.query.texto; 
    pool.query('SELECT * FROM users WHERE usuario ILIKE $1 OR rol ILIKE $1', [`%${texto}%`], (error, results) => {
        if(!texto){
            res.redirect('/');
        }else if (error) {
            console.log('El error de conexión es: ', error);
            throw error;
        } else {
            // Renderizar la vista HTML con los resultados de la búsqueda
            res.render('index', { users: results.rows });
        }
    });
});


// //ANCHOR - Búsqueda dinámica por LIKE
// router.get('/search', (req, res) => {
//     const texto = req.query.texto;
//     pool.query('SELECT * FROM users WHERE usuario ILIKE $1 OR rol ILIKE $1', [`%${texto}%`], (error, results) => {
//         if (error) {
//             console.log('El error de conexión es: ', error);
//             throw error;
//         } else {

//             // Generación de tabla HTML con los resultados de la búsqueda
//             const tableHTML = renderizarTabla(results.rows);
//             res.send(tableHTML);
//         }
//     });
// });

// //ANCHOR - Función de renderizado de tabla para obtener los resultados
// function renderizarTabla(users) {
//     // Construcción de HTML de la tabla con los usuarios proporcionados
//     let html = '<table class="table table-striped-columns">';
//     html += '<thead>';
//     html += '<tr class="bg-primary text-white">';
//     html += '<th>ID</th>';
//     html += '<th>USUARIO</th>';
//     html += '<th>CONTRASEÑA</th>';
//     html += '<th>ROL</th>';
//     html += '<th>ACCIONES</th>';
//     html += '</tr>';
//     html += '</thead>';
//     html += '<tbody>';

//     users.forEach(user => {
//         html += '<tr>';
//         html += `<td>${user.id}</td>`;
//         html += `<td>${user.usuario}</td>`;
//         html += `<td>${user.pass}</td>`;
//         html += `<td>${user.rol}</td>`;

//         //Botones de acción
//         html += `<td>
//         <a href="/edit/${user.id}" class="btn btn-outline-info">Editar</a>
//         <a href="/delete/${user.id}" class="btn btn-outline-danger">Borrar</a>
//         </td>`;
//         html += '</tr>';
//     });

//     html += '</tbody>';
//     html += '</table>';

//     return html;
// }

// router.get('/search', (req, res) => {
    //     const texto = req.query.texto;
    //     if (!texto) {
    //         return res.render('index', { users: [] });
    //     }
    //     pool.query('SELECT * FROM users WHERE usuario ILIKE $1 OR rol ILIKE $1', [`%${texto}%`], (error, results) => {
    //         if (error) {
    //             throw error;
    //         } else {
    //             return res.render('index', { users: results.rows });
    //         }
    //     });
    // });

//ANCHOR - Importación del CRUD
const crud = require('../controllers/crud');
router.post('/save',crud.save);
router.post('/update',crud.update);



module.exports = router;