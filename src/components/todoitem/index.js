const { h, Component, StringComponent, Text } = require('ink');
const PropTypes = require('prop-types');

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require('chalk');

class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Check = ({ checked }) => <span>{checked ? '[x]' : '[ ]'}</span>;
Check.propTypes = {
	checked: PropTypes.bool
};

Check.defaultProps = {
	checked: false
};

class TodoItem extends Component {
	render() {
		const { todo, selected } = this.props;

		const txt = selected ? (
			<Text blue>
				<Bold>{todo.get('value')} </Bold>{' '}
			</Text>
		) : (
			<span>{todo.get('value')}</span>
		);

		return (
			<Text>
				<Check checked={todo.get('checked')} /> {txt} <br />
			</Text>
		);
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	selected: PropTypes.bool
};

TodoItem.defaultProps = {
	selected: false
};

module.exports = TodoItem;
