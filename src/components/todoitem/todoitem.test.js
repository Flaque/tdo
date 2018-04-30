const test = require('ava');
const { h, renderToString } = require('ink');
const TodoItem = require('../todoitem');

test('Unchecked state', t => {
	t.true(renderToString(<TodoItem />).includes('[ ]'));
});
