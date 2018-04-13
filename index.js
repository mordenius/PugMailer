const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.set('view engine', 'pug');

app.get('/', (requesе, response)=>{
    response.render('index')
})

app.listen(3000, ()=>{
	console.log("listen on http://localhost:3000");
})