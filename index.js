const express = require('express');
const pug = require("pug");
const path = require("path");
const dataJson = require("./data/textLayout.json");
//console.log(dataJson['EXP_1']['colum_1_1']['heder'])
const app = express();

app.use(express.static(__dirname));

// app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    const html = pug.renderFile(path.resolve("./views/index.pug"), { val: dataJson['pcg5'], Data: dataJson['additionalInfo'] })
    res.send(html)
})

app.get('/ar', (req, res)=>{
	const html = pug.renderFile(path.resolve("./views/ARIndex.pug"), { val: dataJson['pcg1'], Data: dataJson['additionalInfo'] })
    res.send(html)
})


app.listen(3000, ()=>{
	console.log("listen on http://localhost:3000");
})