import assign from 'object-assign';
import equal from 'deep-equal';

export default function mergeDiff(diff1, diff2) {
	return diff2.reduce((memo, d2item) => {
		if(d2item.kind === 'M') {
			memo.push(d2item);
			diff1.forEach((d1item) => {
				if(d1item.kind === 'N' && equal(d2item.path[1], d1item.path)) {
					memo.push(assign({}, d1item, {
						kind: 'E'
					}));
				}
			});
		}

		return memo;
	}, []).concat(diff1.filter(({ kind }) => {
		return kind === 'D';
	}));
};
