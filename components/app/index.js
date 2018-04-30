const { h } = require('ink');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');

const Query = importJsx('../query');
const Header = importJsx('../header');
const TodoList = importJsx('../todolist');

const App = ({
	todos,
	selectedTodo,
	handleQueryChange,
	handleQuerySubmit,
	query
}) => {
	return (
		<div>
			<Header />
			<Query
				query={query}
				handleQueryChange={handleQueryChange}
				handleQuerySubmit={handleQuerySubmit}
			/>
			<TodoList todos={todos} selectedTodo={selectedTodo} />
		</div>
	);
};
App.propTypes = {
	todos: PropTypes.object.isRequired,
	selectedTodo: PropTypes.string.isRequired,
	handleQueryChange: PropTypes.func.isRequired,
	handleQuerySubmit: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired
};

module.exports = App;
