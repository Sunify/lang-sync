import assert from 'assert';
import proxyquire from 'proxyquire';

function translateMock(string, options, cb) {
	cb(null, {text: [string]});
};

const syncDict = proxyquire('../syncDict', {
	'./translate': {
		translate: translateMock,
		'@runtimeGlobal': true
	}
});

describe('syncDict', function() {

	it('should add key to en dictionary', function(done) {
		const ru = {};
		const ru2 = {
			"title": "Заголовок"
		};
		const en = {};
		const en2 = {};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal("Заголовок", res.title);
			done();
		});
	});

	it('should remove key from en dictionary', function(done) {
		const ru = {
			"title": "Заголовок"
		};
		const ru2 = {};
		const en = {
			"title": "Заголовок"
		};
		const en2 = {
			"title": "Заголовок"
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal(undefined, res.title);
			done();
		});
	});

	it('should rename key in en dictionary', function(done) {
		const ru = {
			"title": "Заголовок"
		};
		const ru2 = {
			"tidle": "Заголовок"
		};
		const en = {
			"title": "Заголовок"
		};
		const en2 = {
			"title": "Заголовок"
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal("Заголовок", res.tidle);
			done();
		});
	});

	it('should add nested key to en dictionary', function(done) {
		const ru = {
			"goal": {}
		};
		const ru2 = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const en = {
			"goal": {}
		};
		const en2 = {
			"goal": {}
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal("Заголовок", res.goal.title);
			done();
		});
	});

	it('should remove nested key from en dictionary', function(done) {
		const ru = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const ru2 = {
			"goal": {
			}
		};
		const en = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const en2 = {
			"goal": {
				"title": "Заголовок"
			}
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal(undefined, res.goal.title);
			done();
		});
	});

	it('should rename nested key from en dictionary', function(done) {
		const ru = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const ru2 = {
			"goal": {
				"name": "Заголовок"
			}
		};
		const en = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const en2 = {
			"goal": {
				"title": "Заголовок"
			}
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal("Заголовок", res.goal.name);
			done();
		});
	});
});
