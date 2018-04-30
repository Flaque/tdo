'use strict';

const { h, Component } = require('ink');
const importJsx = require('import-jsx');
const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');
const { Provider } = require('ink-redux');
const store = require('./store.js');

const App = importJsx('./components/app');

class UI extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			todos: new Map(),
			selected: 'none'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelectItem = this.handleSelectItem.bind(this);
	}

	render() {
		return (
			<Provider store={store}>
				<App
					todos={this.state.todos}
					selectedTodo={this.state.selected}
					handleQueryChange={this.handleChange}
					handleQuerySubmit={this.handleSubmit}
					query={this.state.query}
				/>
			</Provider>
		);
	}

	handleSelectItem() {
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
			prevState.todos = prevState.todos.set(uuid, new Map({ value }));
			prevState.query = '';
			return prevState;
		});
	}
}

module.exports = UI;
