const { createStore } = require('redux');

const store = createStore((state, action) => {
	switch (action.type) {
		default:
			return state;
	}
});

module.exports = store;
