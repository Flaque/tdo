const path = require('path');
const homedir = require('homedir');

function getTdoPath() {
	return process.env.TDO_PATH || path.join(homedir(), '.tdo');
}

module.exports = {
	getTdoPath
};
