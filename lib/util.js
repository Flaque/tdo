const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');

const addTodo = (todos, value) => todos.set(uuidv4(), new Map({ value }));

const nextTodo = (todos, current) => {
	const ids = todos.keySeq();
	const nextIndex = ids.keyOf(current) + 1;
	if (nextIndex >= ids.size) {
		return current;
	}

	return ids.get(nextIndex);
};

module.exports = {
	addTodo,
	nextTodo
};
