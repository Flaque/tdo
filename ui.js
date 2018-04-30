"use strict";

const { h, Component, StringComponent, Text } = require("ink");
const TextInput = require("ink-text-input");
const PropTypes = require("prop-types");
const importJsx = require("import-jsx");
const Bar = importJsx("./components/bar");
const TodoItem = importJsx("./components/todoitem");
const uuidv4 = require("uuid/v4");
const { Map } = require("immutable");

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require("chalk");
class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Header = () => (
	<Text>
		<br />
		<Bold>Tdo</Bold> <Text gray>Press ctrl-c to exit. </Text>
		<br /> <br />
	</Text>
);

const Query = ({ query, handleQueryChange, handleQuerySubmit }) => (
	<div>
		<Bold>{"~ "}</Bold>
		<TextInput
			value={query}
			onChange={handleQueryChange}
			onSubmit={handleQuerySubmit}
			placeholder="ex: feed dogs by saturday"
		/>
	</div>
);

const Todos = ({ todos, selectedTodo }) => {
	const dos = Array.from(todos.entries());

	return (
		<div>
			{dos.map(([uuid, todo]) => (
				<TodoItem todo={todo} selected={uuid === selectedTodo} />
			))}
		</div>
	);
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

class UI extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			todos: Map(),
			selected: "none"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelectItem = this.handleSelectItem.bind(this);
	}

	render(props, state) {
		return (
			<App
				todos={this.state.todos}
				selectedTodo={this.state.selected}
				handleQueryChange={this.handleChange}
				handleQuerySubmit={this.handleSubmit}
				query={this.state.query}
			/>
		);
	}

	handleSelectItem(item) {
		// Do something
	}

	handleChange(value) {
		this.setState({
			query: value
		});
	}

	handleSubmit(value) {
		const uuid = uuidv4();

		this.setState(prevState => {
			prevState.todos = prevState.todos.set(uuid, Map({ value }));
			prevState.query = "";
			return prevState;
		});
	}
}

UI.propTypes = {
	name: PropTypes.string
};

UI.defaultProps = {
	name: "Ink"
};

module.exports = UI;
