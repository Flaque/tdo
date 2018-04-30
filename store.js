const { createStore } = require('redux');
const { Map } = require('immutable');
const uuidv4 = require('uuid/v4');

const addTodo = (todos, value) => todos.set(uuidv4(), new Map({ value }));

const store = createStore(
	(state = { query: '', selectedTodo: '', todos: new Map() }, action) => {
		switch (action.type) {
			case 'QUERY_CHANGE':
				return { ...state, ...{ query: action.value } };
			case 'QUERY_SUBMIT':
				return {
					...state,
					...{ query: '', todos: addTodo(state.todos, action.value) }
				};
			default:
				return state;
		}
	}
);

module.exports = store;
