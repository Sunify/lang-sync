import differ from 'deep-diff';
import prettyjson from 'prettyjson';
import normalizeDiff from './normalizeDiff';
import applyDiff from './applyDiff';
import mergeDiff from './mergeDiff';
import getPrevVersionOfFile from './getPrevVersionOfFile';
import writeLangFile from './writeLangFile';

import ru2 from './ru';
import en2 from './en';

Promise.all(
	['./en.js', './ru.js'].map(getPrevVersionOfFile)
).then(([en, ru]) => {
	const ruDiff = normalizeDiff(differ(ru, ru2) || []);
	const enDiff = normalizeDiff(differ(en, en2) || []);
	const merged = mergeDiff(enDiff, ruDiff);

	console.log(prettyjson.render(enDiff));
	console.log('-----');
	console.log(prettyjson.render(ruDiff));
	console.log('-----');
	console.log(prettyjson.render(merged));

	applyDiff(en, merged).then((en3) => {
		// console.log(prettyjson.render(en3));
		writeLangFile('en', en3);
	});
});
