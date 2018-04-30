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
	todos: PropTypes.object,
	selectedTodo: PropTypes.string,
	handleQueryChange: PropTypes.func,
	handleQuerySubmit: PropTypes.func,
	query: PropTypes.string
};

App.defaultProps = {
	todos: new Map(),
	selectedTodo: '',
	handleQueryChange: () => {},
	handleQuerySubmit: () => {},
	query: ''
};

module.exports = App;
