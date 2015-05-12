import format from 'json-nice';
import fs from 'fs';

export default function(lang, dict) {
	fs.writeFileSync(`./${lang}.js`, `module.exports = ${format(dict)};`);
};
