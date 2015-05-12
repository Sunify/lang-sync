import translate from './translate';

function addValue(obj, path, value) {
	return new Promise((resolve, reject) => {
		path.reduce((memo, key, i, path) => {
			memo[key] = memo[key] || {};
			if(path.length - 1 === i) {
				memo[key] = value;
				translate(value, { to: 'en' }, (err, { text }) => {
					memo[key] = text;
					resolve();
				});
			}

			return memo[key];
		}, obj);
	})
}

function renamePath(obj, srcPath, destPath) {
	return new Promise((resolve) => {
		srcPath.reduce((memo, srcKey, i) => {
			const destKey = destPath[i];
			if(memo[destKey] === undefined) {
				memo[destKey] = memo[srcKey];
				delete memo[srcKey];
				return memo[destKey];
			} else {
				return memo[srcKey];
			}
		}, obj);
		resolve();
	});
}

function deletePath(obj, path) {
	return new Promise((resolve) => {
		path.reduce((memo, key, i, path) => {
			if(path.length - 1 === i) {
				delete memo[key];
				resolve();
			}

			return memo[key];
		}, obj);
	});
}

export default function applyDiff(obj, diff) {
	return new Promise((resolve) => {
		Promise.all(diff.map(({ kind, path, rhs}) => {
			switch(kind) {
				case 'N':
					return addValue(obj, path, rhs);
					break;

				case 'M':
					return renamePath(obj, ...path);
					break;

				case 'D':
					return deletePath(obj, path);
					break;
			}
		}, obj)).then(() => resolve(obj));
	});
};
