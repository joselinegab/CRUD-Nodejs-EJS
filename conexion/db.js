const { Pool } = require("pg");
require('dotenv').config();


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.connect((error)=>{
    if(error){
        console.log('El error de conexión es: ',error);
        return
    }
    console.log('Conectado a PSQL');
})

module.exports = pool;