import path from 'path';
import { exec } from 'child_process';
import requireFromString from './requireFromString';

let cache = {};

export default function(filename) {
	return new Promise((resolve, reject) => {
		if(cache[filename]) {
			resolve(cache[filename]);
		} else {
			exec(`git show HEAD~0:${filename}`, (err, stdout, stderr) => {
				if(err) {
					reject(err);
				} else {
					cache[filename] = requireFromString(stdout);
					resolve(cache[filename]);
				}
			});
		}
	});
};
