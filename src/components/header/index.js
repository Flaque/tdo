const { h, StringComponent, Text } = require('ink');

// TODO: Remove when ink 0.4.1 bug is fixed
const chalk = require('chalk');

class Bold extends StringComponent {
	renderString(children) {
		return chalk.bold(children);
	}
}

const Header = () => (
	<Text>
		<br />
		<Bold>Tdo</Bold> <Text dim>Press ctrl-c to exit. </Text>
		<br /> <br />
	</Text>
);

module.exports = Header;
