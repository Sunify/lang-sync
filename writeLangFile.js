import format from 'json-nice';
import { js_beautify } from 'js-beautify';
import fs from 'fs';

export default function(lang, dict) {
	fs.writeFileSync(`./${lang}.js`, `module.exports = ${js_beautify(JSON.stringify(dict), {
		indent_with_tabs: true
	})};`);
};
