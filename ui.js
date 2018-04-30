'use strict';

const { h, Component } = require('ink');
const importJsx = require('import-jsx');
const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');
const { Provider } = require('ink-redux');
const store = require('./store.js');

const App = importJsx('./components/app');

const UI = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

module.exports = UI;
