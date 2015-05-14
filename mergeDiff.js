import assign from 'object-assign';
import equal from 'deep-equal';

export default function mergeDiff(diff1, diff2) {
	let except = [];

	return diff2.reduce((memo, d2item) => {
		if(d2item.kind === 'M') {
			memo.push(d2item);
			diff1.forEach((d1item, i) => {
				if(d1item.kind === 'N' && equal(d2item.path[1], d1item.path)) {
					except.push(i);
					memo.push(assign({}, d1item, {
						kind: 'E'
					}));
				}
			});
		}

		if(d2item.kind === 'N') {
			memo.push(d2item);
		}

		return memo;
	}, []).concat(diff1.filter(({ kind }, i) => {
		// console.log(except, i);
		return kind === 'D' || kind === 'N' && except.indexOf(i) === -1;
	}));
};
