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
		}).catch((err) => done(err));
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
		}).catch((err) => done(err));
	});

	it('should rename key in en dictionary', function(done) {
		const ru = {
			"title": "Заголовок"
		};
		const ru2 = {
			"name": "Заголовок"
		};
		const en = {
			"title": "Заголовок"
		};
		const en2 = {
			"title": "Заголовок"
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal(undefined, res.title);
			assert.equal("Заголовок", res.name);
			done();
		}).catch((err) => done(err));
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
		}).catch((err) => done(err));
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
		}).catch((err) => done(err));
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
			assert.equal(undefined, res.goal.title);
			assert.equal("Заголовок", res.goal.name);
			done();
		}).catch((err) => done(err));
	});

	it('should do not touch edited value in en dictionary after renaming', function(done) {
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
				"title": "Title"
			}
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal(undefined, res.goal.title);
			assert.equal("Title", res.goal.name);
			done();
		}).catch((err) => done(err));
	});

	it('should do not touch edited value of new key in en dictionary', function(done) {
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
			"goal": {
				"title": "Title"
			}
		};

		syncDict(en2, en, ru2, ru).then((res) => {
			assert.equal("Title", res.goal.title);
			done();
		}).catch((err) => done(err));
	});
});
