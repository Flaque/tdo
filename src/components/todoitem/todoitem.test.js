const test = require('ava');
const { h, renderToString } = require('ink');
const { Map } = require('immutable');
const TodoItem = require('../todoitem');

test('Unchecked state', t => {
	renderToString(<TodoItem todo={new Map()} />);
	t.true(renderToString(<TodoItem todo={new Map()} />).includes('[ ]'));
});

test('checked state', t => {
	const todo = new Map({ checked: true });
	t.true(renderToString(<TodoItem todo={todo} />).includes('[x]'));
});
