const express = require('express');
const pug = require("pug");
const path = require("path");
const dataJson = require("./data/textLayout.json");
console.log(dataJson['EXP_1']['colum_1_1']['heder'])
const app = express();

app.use(express.static(__dirname));

// app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    // response.render('index')
    const html = pug.renderFile(path.resolve("./views/index.pug"), { val: dataJson['EXP_1'],Data: dataJson['else'] })
    res.send(html)
})

app.get('/ar', (requesе, response)=>{
    response.render('ARIndex.pug')
})


app.listen(3000, ()=>{
	console.log("listen on http://localhost:3000");
})