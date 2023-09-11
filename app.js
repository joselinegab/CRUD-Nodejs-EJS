const express = require ('express');
const app = express();
require('dotenv').config();


//Invocar motor de plantillas
app.set('view engine', 'ejs');

app.use (express.urlencoded({extended:false}));
app.use(express.json());


app.use ('/', require('./routes/router'));

app.listen(process.env.PORT,()=>{
    console.log('SERVER corriendo en http://localhost:3000');
});