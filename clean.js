import { nullMark } from './consts.js';

function clean(diff) {
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

export default clean;
