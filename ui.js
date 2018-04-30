'use strict';

const { h, Component } = require('ink');
const importJsx = require('import-jsx');
const { Provider } = require('ink-redux');
const store = require('./redux/store.js');

const App = importJsx('./components/app');

const { stdin } = process;

class UI extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}

	componentDidMount() {
		stdin.on('keypress', this.handleKeyPress);
	}

	componentWillUnMount() {
		stdin.removeListener('keypress', this.handleKeyPress);
	}

	handleKeyPress(ch, key) {
		const press = key.name;

		switch (press) {
			case 'down':
				store.dispatch({ type: 'MOVE_CURSOR_DOWN' });
				break;

			default:
				break;
		}
	}
}
module.exports = UI;
