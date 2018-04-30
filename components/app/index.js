const { h, StringComponent } = require('ink');
const TextInput = require('ink-text-input');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');

const TodoItem = importJsx('../todoitem');
const Header = importJsx('../header');

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require('chalk');

class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Query = ({ query, handleQueryChange, handleQuerySubmit }) => (
	<div>
		<Bold>{'~ '}</Bold>
		<TextInput
			value={query}
			onChange={handleQueryChange}
			onSubmit={handleQuerySubmit}
			placeholder="ex: feed dogs by saturday"
		/>
	</div>
);
Query.propTypes = {
	query: PropTypes.string.isRequired,
	handleQueryChange: PropTypes.func.isRequired,
	handleQuerySubmit: PropTypes.func.isRequired
};

const Todos = ({ todos, selectedTodo }) => {
	const dos = [...todos.entries()];

	return (
		<div>
			{dos.map(([uuid, todo]) => (
				<TodoItem key={uuid} todo={todo} selected={uuid === selectedTodo} />
			))}
		</div>
	);
};
Todos.propTypes = {
	todos: PropTypes.array.isRequired,
	selectedTodo: PropTypes.string.isRequired
};

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
			<Todos todos={todos} selectedTodo={selectedTodo} />
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
