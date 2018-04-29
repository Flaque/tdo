const { h, Component, StringComponent, Text } = require("ink");

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require("chalk");
class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Check = props => <span>{props.checked ? "[x]" : "[ ]"}</span>;

class TodoItem extends Component {
	render(props, state) {
		const txt = props.selected ? (
			<Bold>{props.children}</Bold>
		) : (
			<span>{props.children}</span>
		);

		return (
			<Text>
				<Check checked={props.checked} /> {txt}
			</Text>
		);
	}
}

module.exports = TodoItem;
