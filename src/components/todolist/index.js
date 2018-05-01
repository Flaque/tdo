const { h } = require('ink');
const PropTypes = require('prop-types');
const { connect } = require('ink-redux');

const TodoItem = require('../todoitem');

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
	todos: PropTypes.object.isRequired,
	selectedTodo: PropTypes.string.isRequired
};

const mapStateToProps = ({ todos, selectedTodo }) => ({
	todos,
	selectedTodo
});

module.exports = connect(mapStateToProps)(TodoList);
