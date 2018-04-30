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

test('QUERY_SUBMIT will wipe query value', t => {
	store.dispatch({
		type: 'QUERY_SUBMIT',
		value: 'doggos'
	});

	t.deepEqual(store.getState().query, '');
});

test('QUERY_SUBMIT will add new todo', t => {
	store.dispatch({
		type: 'QUERY_SUBMIT',
		value: 'doggos'
	});

	const todo = store
		.getState()
		.todos.valueSeq()
		.first();
	t.deepEqual(todo.get('value'), 'doggos');
});

test('QUERY_SUBMIT will add new todo with a uuid', t => {
	store.dispatch({
		type: 'QUERY_SUBMIT',
		value: 'doggos'
	});

	const id = store
		.getState()
		.todos.keySeq()
		.first();

	t.true(isuuid(id));
});

test('QUERY_SUBMIT will set the selection on first submit', t => {
	store.dispatch({
		type: 'QUERY_SUBMIT',
		value: 'doggos'
	});

	const id = store.getState().selectedTodo;
	t.true(isuuid(id));
});

test('MOVE_CURSOR_DOWN will change the selection to the next todo', t => {
	store.dispatch({
		type: 'QUERY_SUBMIT',
		value: 'doggos'
	});

	store.dispatch({
		type: 'QUERY_SUBMIT',
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
