import differ from 'deep-diff';
import normalizeDiff from './normalizeDiff';
import applyDiff from './applyDiff';

const ru1 = {
	"yeap": "Да",
	"error": "Ошибка",
	"nope": "Нет",
	"goal": {
		"name": "Имя",
		"options": {
			1: "Раз",
			2: "Два",
			3: "Три"
		}
	},
	"values": [1, 2, 3]
};

const ru2 = {
	"yeap": "Да",
	"error": "Ошибка",
	"nope": "Нет",
	"alert": "Внимание!",
	"goal": {
		"title": "Имя",
		"options": {
			1: "Раз",
			2: "Два",
			3: "Три"
		}
	},
	"valuez": [1, 2, 3]
};

const en = {
	"yeap": "Yeap",
	"error": "Error",
	"nope": "Nope",
	"goal": {
		"name": "Name",
		"options": {
			1: "One",
			2: "Two",
			3: "Three"
		}
	},
	"values": [1, 2, 3]
};

const diff = normalizeDiff(differ(ru1, ru2) || []);
console.log(diff);

applyDiff(en, diff).then((en2) => {
	console.log(en2);
});
