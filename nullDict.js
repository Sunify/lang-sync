import traverse from 'traverse';
import copy from 'deepcopy';
import { nullMark } from './consts.js';

function nullDict(dict) {
	dict = copy(dict);
	traverse(dict).forEach(function(x) {
		if(typeof x !== 'object') {
			this.update(nullMark);
		}
	});

	return dict;
}

export default nullDict;