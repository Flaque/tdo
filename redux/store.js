const { createStore } = require('redux');
const { OrderedMap } = require('immutable');
const { addTodo, nextTodo, prevTodo } = require('../lib/util');

const submitTodo = (state, action) => {
	const todos = addTodo(state.todos, action.value);
	const selectedTodo =
		todos.count() === 1 ? todos.keySeq().get(0) : state.selectedTodo;

	return {
		...state,
		...{
			query: '',
			todos,
			selectedTodo
		}
	};
};

const reducer = (
	state = { query: '', selectedTodo: '', todos: new OrderedMap() },
	action
) => {
	switch (action.type) {
		case 'QUERY_CHANGE':
			return { ...state, ...{ query: action.value } };
		case 'QUERY_SUBMIT':
			return submitTodo(state, action);
		case 'MOVE_CURSOR_DOWN':
			return {
				...state,
				...{ selectedTodo: nextTodo(state.todos, state.selectedTodo) }
			};
		case 'MOVE_CURSOR_UP':
			return {
				...state,
				...{ selectedTodo: prevTodo(state.todos, state.selectedTodo) }
			};
		default:
			return state;
	}
};

const store = createStore(reducer);

module.exports = store;
