const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');

const addTodo = (todos, value) =>
	todos.set(uuidv4(), new Map({ value, checked: false }));

const nextTodo = (todos, current) => {
	if (current === undefined) {
		return '';
	}

	const ids = todos.keySeq();
	const nextIndex = ids.keyOf(current) + 1;
	if (nextIndex >= ids.size) {
		return current;
	}

	return ids.get(nextIndex);
};

const prevTodo = (todos, current) => {
	if (current === undefined) {
		return '';
	}

	const ids = todos.keySeq();
	const prevIndex = ids.keyOf(current) - 1;
	if (prevIndex < 0) {
		return current;
	}

	return ids.get(prevIndex);
};

const checkTodo = (todos, id) => {
	if (todos.count() === 0) {
		return todos;
	}

	let todo = todos.get(id);
	todo = todo.set('checked', !todo.get('checked'));

	return todos.set(id, todo);
};

module.exports = {
	addTodo,
	nextTodo,
	prevTodo,
	checkTodo
};
