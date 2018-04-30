const { h } = require('ink');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');

const TodoItem = importJsx('../todoitem');

const TodoList = ({ todos, selectedTodo }) => {
	const dos = [...todos.entries()];

	return (
		<div>
			{dos.map(([uuid, todo]) => (
				<TodoItem key={uuid} todo={todo} selected={uuid === selectedTodo} />
			))}
		</div>
	);
};
TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	selectedTodo: PropTypes.string.isRequired
};

module.exports = TodoList;
