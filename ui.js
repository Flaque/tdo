"use strict";

const { h, Component, StringComponent, Text } = require("ink");
const TextInput = require("ink-text-input");
const PropTypes = require("prop-types");
const importJsx = require("import-jsx");
const Bar = importJsx("./components/bar");
const TodoItem = importJsx("./components/todoitem");
const uuidv4 = require('uuid/v4');

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require("chalk");
class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

class UI extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			todos: [],
			selected: "none"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelectItem = this.handleSelectItem.bind(this);
	}

	render(props, state) {
		return (
			<div>
				<br />

				<Text>
					<Bold>Tdo</Bold> <Text gray>Press ctrl-c to exit. </Text> {"\n\n"}
				</Text>

				<Bold>{"~ "}</Bold>
				<TextInput
					value={state.query}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					placeholder="ex: feed dogs by saturday"
				/>

				<br />

				{state.todos.map(({ value, checked, uuid }) => (
					<TodoItem checked={checked} selected={this.state.selected === uuid}>
						{value}
						{"\n"}
					</TodoItem>
				))}
			</div>
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
			prevState.todos.push({ value, uuid });
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
