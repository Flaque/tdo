"use strict";

const { h, Component, StringComponent, Text } = require("ink");
const TextInput = require("ink-text-input");
const { Select, Option, Separator } = require("ink-select-flaque-patch");
const PropTypes = require("prop-types");
const importJsx = require("import-jsx");
const Bar = importJsx("./components/bar");

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
			todos: []
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

				<Select onSelect={this.handleSelectItem}>
					{state.todos.map(({ value }) => (
						<div>
							{" "}
							<Option value={value}>{value}</Option>
						</div>
					))}
				</Select>
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
		this.setState(prevState => {
			prevState.todos.push({ value });
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
