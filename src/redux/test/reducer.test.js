const isuuid = require('isuuid');
const test = require('ava');
const getStore = require('../store');

let { store } = getStore();

test.beforeEach(() => {
	store = getStore().store;
});

test.serial('QUERY_CHANGE will set the query value', t => {
	store.dispatch({
		type: 'QUERY_CHANGE',
		value: 'doggos'
	});

	t.deepEqual(store.getState().query, 'doggos');
});

test.serial('ENTER_PRESSED will wipe query value', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	t.deepEqual(store.getState().query, '');
});

test.serial('ENTER_PRESSED will add new todo', t => {
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

test.serial('ENTER_PRESSED will add new todo with a uuid', t => {
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

test.serial('ENTER_PRESSED will set the selection on first submit', t => {
	store.dispatch({
		type: 'ENTER_PRESSED',
		value: 'doggos'
	});

	const id = store.getState().selectedTodo;
	t.true(isuuid(id));
});

test.serial(
	'MOVE_CURSOR_DOWN will change the selection to the next todo',
	t => {
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
	}
);

test.serial(
	'MOVE_CURSOR_DOWN will change the selection to the past todo',
	t => {
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

		store.dispatch({
			type: 'MOVE_CURSOR_UP'
		});

		const [first, second] = [...store.getState().todos.keys()];

		// Sanity check
		t.true(isuuid(first));
		t.true(isuuid(second));

		t.deepEqual(first, store.getState().selectedTodo);
	}
);
