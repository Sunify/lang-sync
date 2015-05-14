import assign from 'object-assign';
import equal from 'deep-equal';

function patchPath(path, movePath) {
	return path.map((step, i) => movePath[i] || step);
}

function isIncludePath(orig, part) {
	return part.filter((step, i) => orig.indexOf(step) === i).length === part.length;
}

function detectEditChange(item, moves) {
	if(item.kind !== 'N') {
		return item;
	}

	// const path = item.path.join('.');
	// const newPath = [];
	const itemMoves = moves.filter((m) => isIncludePath(item.path, m.path[0]));

	if(itemMoves.length > 0) {
		return assign({}, item, {
			kind: 'E',
			path: patchPath(item.path, itemMoves[0].path[1])
		});
	}

	return item;
}

function renameEditPath(item, moves) {
	if(item.kind !== 'E') {
		return item;
	}

	const itemMoves = moves.filter((m) => isIncludePath(item.path, m.path[0]));

	if(itemMoves.length > 0) {
		return assign({}, item, {
			path: patchPath(item.path, itemMoves[0].path[1])
		});
	}

	return item;
}

export default function mergeDiff(diff1, diff2) {
	const moves = diff1.filter(({ kind }) => kind === 'M');
	return diff1.concat(
		diff2
			.filter(({ kind }) => kind !== 'D')
			.map((d2item) => {
				const edit = detectEditChange(d2item, moves);
				if(!equal(edit, d2item)) {
					return edit;
				}

				const renamePath = renameEditPath(d2item, moves);
				if(!equal(renamePath, d2item)) {
					return renamePath;
				}

				return d2item;
			})
	);
};
