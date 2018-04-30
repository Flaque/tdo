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
	render(props) {
		const { todo, selected } = props;

		const txt = todo.get("selected") ? (
			<Bold>{todo.get("value")}</Bold>
		) : (
			<span>{todo.get("value")}</span>
		);

		return (
			<Text>
				<Check checked={todo.get("checked")} /> {txt} <br/>
			</Text>
		);
	}
}

module.exports = TodoItem;
