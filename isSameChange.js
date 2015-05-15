import equal from 'deep-equal';

function isSameChange(ch1, ch2) {
	return ch1.kind === ch2.kind && equal(ch1.path, ch2.path);
}

export default isSameChange;
