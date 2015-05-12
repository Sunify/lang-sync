import equal from 'deep-equal';

function processPath(path) {
	return path;
}

function detectRenamings(diff) {
	const D = diff.filter(({ kind }) => kind === 'D');
	const N = diff.filter(({ kind }) => kind === 'N');

	return D.reduce((memo, { path, lhs }) => {
		const match = N.filter(({ rhs }) => equal(rhs, lhs));
		if(match.length === 1) {
			memo.push([
				path,
				match[0].path
			].map(processPath));
		}

		return memo;
	}, []);
}

export default function normalizeDiff(diff) {
	const renamings = detectRenamings(diff);
	diff = diff.filter(({ path, kind }) => {
		return renamings.filter((r) => {
			return equal(r[0], path) || equal(r[1], path);
		}).length === 0;
	});

	return diff.concat(renamings.map((r) => {
		return {
			kind: 'M',
			path: r
		};
	}));
};
