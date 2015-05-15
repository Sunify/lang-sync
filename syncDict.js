import differ from 'deep-diff';
import normalizeDiff from './normalizeDiff';
import applyDiff from './applyDiff';
import mergeDiff from './mergeDiff';
import nullDict from './nullDict';
import clean from './clean';

function syncDict(dict, dictBase, src, srcBase) {
	const srcDiff = normalizeDiff(differ(srcBase, src));
	const dictDiff = normalizeDiff(differ(dictBase, dict));

	const merged = clean(
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

export default syncDict;
