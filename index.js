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

function dedupe(diff) {
	let except = [];

	return diff.reduce((memo, item, i, diff) => {
		const { rhs = '', lhs = '', kind, path } = item;
		if(rhs !== nullMark && except.indexOf(i) === -1) {
			memo.push(item);

			if(lhs === nullMark && kind === 'D') {
				diff.some((item2, j) => {
					if(item2.kind === 'N' && equal(item2.path, path)) {
						except.push(j);
						return true;
					}

					return false;
				});
			} else {

			}
		}

		return memo;
	}, []);
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

function syncDict(dict, dictBase, src, srcBase) {
	const srcDiff = normalizeDiff(differ(srcBase, src));
	const dictDiff = normalizeDiff(differ(dictBase, dict));

	const merged = dedupe(
		normalizeDiff(mergeDiff(
			normalizeDiff(differ(
				nullDict(dict),
				nullDict(src)
			)),
			mergeDiff(
				srcDiff,
				dictDiff.filter(({ kind }) => kind !== 'M')
			)
		))
	);

	return applyDiff(dictBase, merged);
}


Promise.all(
	['./en.js', './ru.js'].map(getPrevVersionOfFile)
).then(([en, ru]) => {
	syncDict(en2, en, ru2, ru).then((res) => {
		writeLangFile('en', res);
	});
});
