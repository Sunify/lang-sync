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

	it('should add key to slave dictionary', function(done) {
		const master = {};
		const master2 = {
			"title": "Заголовок"
		};
		const slave = {};
		const slave2 = {};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal("Заголовок", res.title);
			done();
		}).catch((err) => done(err));
	});

	it('should remove key from slave dictionary', function(done) {
		const master = {
			"title": "Заголовок"
		};
		const master2 = {};
		const slave = {
			"title": "Заголовок"
		};
		const slave2 = {
			"title": "Заголовок"
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.title);
			done();
		}).catch((err) => done(err));
	});

	it('should rename key in slave dictionary', function(done) {
		const master = {
			"title": "Заголовок"
		};
		const master2 = {
			"name": "Заголовок"
		};
		const slave = {
			"title": "Заголовок"
		};
		const slave2 = {
			"title": "Заголовок"
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.title);
			assert.equal("Заголовок", res.name);
			done();
		}).catch((err) => done(err));
	});

	it('should rename new key in slave dictionary', function(done) {
		const master = {
		};
		const master2 = {
			"title": "Заголовок"
		};
		const slave = {
		};
		const slave2 = {
			"name": "Заголовок"
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.name);
			assert.equal("Заголовок", res.title);
			done();
		}).catch((err) => done(err));
	});

	it('should add nested key to slave dictionary', function(done) {
		const master = {
			"goal": {}
		};
		const master2 = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const slave = {
			"goal": {}
		};
		const slave2 = {
			"goal": {}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal("Заголовок", res.goal.title);
			done();
		}).catch((err) => done(err));
	});

	it('should remove nested key from slave dictionary', function(done) {
		const master = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const master2 = {
			"goal": {
			}
		};
		const slave = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const slave2 = {
			"goal": {
				"title": "Заголовок"
			}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.goal.title);
			done();
		}).catch((err) => done(err));
	});

	it('should rename nested key from slave dictionary', function(done) {
		const master = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const master2 = {
			"goal": {
				"name": "Заголовок"
			}
		};
		const slave = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const slave2 = {
			"goal": {
				"title": "Заголовок"
			}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.goal.title);
			assert.equal("Заголовок", res.goal.name);
			done();
		}).catch((err) => done(err));
	});

	it('should do not touch edited value in slave dictionary after renaming', function(done) {
		const master = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const master2 = {
			"goal": {
				"name": "Заголовок"
			}
		};
		const slave = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const slave2 = {
			"goal": {
				"title": "Title"
			}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal(undefined, res.goal.title);
			assert.equal("Title", res.goal.name);
			done();
		}).catch((err) => done(err));
	});

	it('should do not touch edited value of new key in slave dictionary', function(done) {
		const master = {
			"goal": {}
		};
		const master2 = {
			"goal": {
				"title": "Заголовок"
			}
		};
		const slave = {
			"goal": {}
		};
		const slave2 = {
			"goal": {
				"title": "Title"
			}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal("Title", res.goal.title);
			done();
		}).catch((err) => done(err));
	});

	it('should do all right', function(done) {
		const master = {
			"goal": {}
		};
		const master2 = {
			"goall": {
				"title": "Заголовок"
			}
		};
		const slave = {
			"goal": {}
		};
		const slave2 = {
			"goal": {
				"title": "Title"
			}
		};

		syncDict(slave2, slave, master2, master).then((res) => {
			assert.equal("Title", res.goall.title);
			done();
		}).catch((err) => done(err));
	});
});
