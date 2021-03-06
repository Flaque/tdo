'use strict';

const { h, Component } = require('ink');
const { Provider } = require('ink-redux');
const getStore = require('./redux/store.js');
const App = require('./components/app');

const { store } = getStore();
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
			case 'up':
				store.dispatch({ type: 'MOVE_CURSOR_UP' });
				break;
			default:
				break;
		}
	}
}
module.exports = UI;
