const test = require('ava');
const isuuid = require('isuuid');
const { OrderedMap } = require('immutable');
const { addTodo, nextTodo, prevTodo, checkTodo } = require('../util');

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

test('nextTodo gets an empty string if theres no current', t => {
	const todos = new OrderedMap();

	t.deepEqual(nextTodo(todos, undefined), '');
});

test('prevTodo gets the previous uuid', t => {
	let todos = new OrderedMap();
	todos = addTodo(addTodo(todos, 'doggos'), 'cattos');

	const first = todos.keySeq().get(0);
	const second = todos.keySeq().get(1);

	t.deepEqual(prevTodo(todos, second), first);
});

test('prevTodo gets the first index instead of overflowing', t => {
	let todos = new OrderedMap();
	todos = addTodo(addTodo(todos, 'doggos'), 'cattos');

	const first = todos.keySeq().get(0);

	t.deepEqual(prevTodo(todos, first), first);
});

test('prevTodo gets an empty string if theres no current', t => {
	const todos = new OrderedMap();

	t.deepEqual(prevTodo(todos, undefined), '');
});

test('checkTodo will check an existing todo', t => {
	let todos = new OrderedMap();
	todos = addTodo(todos, 'doggos');

	const todo = todos.keySeq().get(0);
	todos = checkTodo(todos, todo);

	t.true(todos.first().get('checked'));
});
