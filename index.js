const express = require('express');
const path = require("path");
const _ = require("lodash");

const pug = require("pug");
const juice = require("juice");
const sass = require('node-sass');

const layout = require("./data/layout.json");

const en = require("./data/locale/en.json");
const ar = require("./data/locale/ar.json");

const app = express();

const locale = { en, ar };

const _TEMPLATE = path.resolve("./views-ref/template.pug");
const _STYLE = path.resolve(`./views-ref/style/main.sass`);
const _STORAGE = `http://localhost:3000/storage/`;

const localeParse = (type, lang) => {
	const data = _.cloneDeep(layout[type]);

	_.each(data.days, (day, dayCnt) => {
		_.each(day.blocks, (block, blockCnt) => {
			block.title = _.get(locale[lang], block.title);
			block.cover = `${_STORAGE}${type}/${block.cover}`;
			block.desc = _.get(locale[lang][type], `day${dayCnt}.block${blockCnt}`);
		})
	})

	return data;
}

const render = (data) => {
	const cssBuffer = sass.renderSync({ file: _STYLE });
	const style = cssBuffer.css.toString();

	const html = pug.renderFile(_TEMPLATE, { data, style });

	return juice(html);
}

app.use(express.static(__dirname));

app.get('/:lang/:type', (req, res)=>{
	const data = localeParse(req.params.type, req.params.lang);
    const html = render(data);
    res.send(html)
});

app.listen(3000, ()=>{
	console.log("listen on http://localhost:3000");
});