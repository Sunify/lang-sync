import differ from 'deep-diff';
import normalizeDiff from './normalizeDiff';
import applyDiff from './applyDiff';
import getPrevVersionOfFile from './getPrevVersionOfFile';
import writeLangFile from './writeLangFile';

import ru2 from './ru';
import en from './en';

getPrevVersionOfFile('./ru.js').then((ru) => {
	const diff = normalizeDiff(differ(ru, ru2) || []);
	console.log(diff);

	applyDiff(en, diff).then((en2) => {
		console.log(en2);
		writeLangFile('en', en2);
	});
});
