const { h, StringComponent } = require('ink');
const TextInput = require('ink-text-input');
const PropTypes = require('prop-types');
const { connect } = require('ink-redux');

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require('chalk');

class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Query = ({ query, handleQueryChange, handleQuerySubmit }) => (
	<div>
		<Bold>{'~ '}</Bold>
		<TextInput
			value={query}
			onChange={handleQueryChange}
			onSubmit={handleQuerySubmit}
			placeholder="ex: feed dogs by saturday"
		/>
	</div>
);
Query.propTypes = {
	query: PropTypes.string.isRequired,
	handleQueryChange: PropTypes.func.isRequired,
	handleQuerySubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ query }) => ({
	query
});

const mapDispatchToProps = {
	handleQueryChange: value => ({ type: 'QUERY_CHANGE', value }),
	handleQuerySubmit: value => ({ type: 'QUERY_SUBMIT', value })
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Query);
