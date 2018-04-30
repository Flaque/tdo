const isuuid = require('isuuid');
const test = require('ava');
const store = require('../store');

test('QUERY_CHANGE will set the query value', t => {
	store.dispatch({
		type: 'QUERY_CHANGE',
		value: 'doggos'
	});

	t.deepEqual(store.getState().query, 'doggos');
});

test('ENTER_PRESSED will wipe query value', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	t.deepEqual(store.getState().query, '');
});

test('ENTER_PRESSED will add new todo', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	const todo = store
		.getState()
		.todos.valueSeq()
		.first();
	t.deepEqual(todo.get('value'), 'doggos');
});

test('ENTER_PRESSED will add new todo with a uuid', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	const id = store
		.getState()
		.todos.keySeq()
		.first();

	t.true(isuuid(id));
});

test('ENTER_PRESSED will set the selection on first submit', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	const id = store.getState().selectedTodo;
	t.true(isuuid(id));
});

test('ENTER_PRESSED will check a box if no value passed', t => {
	// Add something
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	let todo = store
		.getState()
		.todos.valueSeq()
		.get(0);

	// Sanity check
	t.true(!todo.get('checked'));

	// Check the box
	store.dispatch({
		type: 'ENTER_PRESSED'
	});

	todo = store
		.getState()
		.todos.valueSeq()
		.get(0);

	t.true(todo.get('checked'));
});

test('MOVE_CURSOR_DOWN will change the selection to the next todo', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'cattos'
	});

	store.dispatch({
		type: 'MOVE_CURSOR_DOWN'
	});

	const [first, second] = [...store.getState().todos.keys()];

	// Sanity check
	t.true(isuuid(first));
	t.true(isuuid(second));

	t.deepEqual(second, store.getState().selectedTodo);
});
