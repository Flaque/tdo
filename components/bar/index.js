"use strict";

const { h, Component, Text } = require("ink");

class Bar extends Component {
	render(props) {
		const columns = process.stdout.columns;
		const chars = props.character.repeat(columns).substring(0, columns);
		return (
			<Text>
				{"\n"}
				{chars}
				{"\n"}
			</Text>
		);
	}
}

module.exports = Bar;
