import differ from 'deep-diff';
import copy from 'deepcopy';
import prettyjson from 'prettyjson';
import traverse from 'traverse';
import equal from 'deep-equal';
import normalizeDiff from './normalizeDiff';
import applyDiff from './applyDiff';
import mergeDiff from './mergeDiff';
import getPrevVersionOfFile from './getPrevVersionOfFile';
import writeLangFile from './writeLangFile';

import ru2 from './ru';
import en2 from './en';

const nullMark = '!!!----!!!!____&&&';

function isSameChange(ch1, ch2) {
	return ch1.kind === ch2.kind && equal(ch1.path, ch2.path);
}

function indexOf(arr, item) {
	let res = -1;
	arr.some((arrItem, i) => {
		if(isSameChange(arrItem, item)) {
			res = i;
			return true;
		} else {
			return false;
		}
	});

	return res;
}

function dedupe(diff) {
	return diff.filter(({ rhs = '' }) => rhs !== nullMark);
}

function nullDict(dict) {
	dict = copy(dict);
	traverse(dict).forEach(function(x) {
		if(typeof x !== 'object') {
			this.update(nullMark);
		}
	});

	return dict;
}

// const nulledRu = nullDict(ru2);
// const nulledEn = nullDict(en2);


Promise.all(
	['./en.js', './ru.js'].map(getPrevVersionOfFile)
).then(([en, ru]) => {
	const ruDiff = normalizeDiff(differ(ru, ru2));
	const enDiff = normalizeDiff(differ(en, en2));
	// const nullDiff = ;
	const merged = dedupe(
		normalizeDiff(mergeDiff(
			normalizeDiff(differ(
				nullDict(en2),
				nullDict(ru2)
			)),
			mergeDiff(
				ruDiff,
				enDiff.filter(({ kind }) => kind !== 'M')
			)
		))
	);

	// console.log(prettyjson.render(nullDiff));

	// console.log(prettyjson.render(ruDiff));
	// console.log('-----');
	// console.log(prettyjson.render(enDiff));
	console.log('-----');
	console.log(prettyjson.render(merged));

	applyDiff(en, merged).then((en3) => {
		// console.log(prettyjson.render(en3));
		writeLangFile('en', en3);
	});
});
