const { createStore } = require('redux');
const { OrderedMap } = require('immutable');
const immutableTransform = require('redux-persist-transform-immutable');
const { persistStore, persistReducer } = require('redux-persist');
const { AsyncNodeStorage } = require('redux-persist-node-storage');
const { addTodo, nextTodo, prevTodo, removeTodo } = require('../lib/util');
const { getTdoPath } = require('../io/util');

const storage = new AsyncNodeStorage(getTdoPath());
const persistConfig = {
	key: 'root',
	storage,
	transforms: [immutableTransform()]
};

const add = (state, action) => {
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

const remove = state => {
	if (state.todos.count() === 0) {
		return state; // Don't remove from nothing
	}

	// Try to set the selected state to the previous
	const prev = prevTodo(state.todos, state.selectedTodo);
	let any = prev;

	// If there is no previous, set it to the next
	if (prevTodo(state.todos, state.selectedTodo) === state.selectedTodo) {
		any = nextTodo(state.todos, state.selectedTodo);
	}

	// If neither of those work, just set it to empty
	if (any === state.selectedTodo) {
		any = ' ';
	}

	return {
		...state,
		...{
			todos: removeTodo(state.todos, state.selectedTodo),
			selectedTodo: any
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
		case 'ENTER_PRESSED':
			if (action.value === undefined || action.value === '') {
				return remove(state);
			}
			return add(state, action);
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

const getStore = () => {
	const persistedReducer = persistReducer(persistConfig, reducer);
	const store = createStore(persistedReducer);
	return { store, persistor: persistStore(store) };
};

module.exports = getStore;
