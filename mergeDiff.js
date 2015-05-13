import assign from 'object-assign';

export default function mergeDiff(diff1, diff2) {
	const MND2 = diff2.filter(({ kind }) => kind === 'M' || kind === 'N' || kind === 'D');
	return MND2.concat(diff1.reduce((memo, d1item) => {
		if(d1item.kind === 'E') {
			memo.push(assign({}, d1item, {
				path: diff2.reduce((memo, d2item) => {
					if(d2item.kind === 'M' && memo.join('.').indexOf(d2item.path[0].join('.')) === 0) {
						memo = memo.join('.').replace(
							d2item.path[0].join('.'),
							d2item.path[1].join('.')
						).split('.');
					}

					return memo;
				}, d1item.path)
			}));
		}

		return memo;
	}, []));
};
