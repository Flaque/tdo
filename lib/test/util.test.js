const test = require('ava');
const isuuid = require('isuuid');
const { OrderedMap } = require('immutable');
const { addTodo, nextTodo } = require('../util');

test('adding todos assigns them an id', t => {
	const todos = new OrderedMap();
	const ids = [...addTodo(todos, 'feed doggos').keys()];
	t.true(isuuid(ids[0]));
});

test('nextTodo gets the second uuid', t => {
	let todos = new OrderedMap();
	todos = addTodo(addTodo(todos, 'doggos'), 'cattos');

	const first = todos.keySeq().get(0);
	const second = todos.keySeq().get(1);

	t.deepEqual(nextTodo(todos, first), second);
});

test('nextTodo gets the last index instead of overflowing', t => {
	let todos = new OrderedMap();
	todos = addTodo(addTodo(todos, 'doggos'), 'cattos');

	const second = todos.keySeq().get(1);

	t.deepEqual(nextTodo(todos, second), second);
});