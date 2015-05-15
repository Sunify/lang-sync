import prettyjson from 'prettyjson';
import getPrevVersionOfFile from './getPrevVersionOfFile';
import writeLangFile from './writeLangFile';
import syncDict from './syncDict';

import ru2 from './ru';
import en2 from './en';

Promise.all(['./en.js', './ru.js'].map(getPrevVersionOfFile))
	.then(([en, ru]) => {
		syncDict(en2, en, ru2, ru).then((res) => {
			writeLangFile('en', res);
		});
	});
