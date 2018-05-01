const fs = require('fs-extra');
const { getTdoPath } = require('./util');

async function read() {
	await fs.ensureFile(getTdoPath());
	return fs.readJson(getTdoPath());
}

async function write(data) {
	await fs.ensureFile(getTdoPath());
	return fs.writeJson(getTdoPath(), data);
}

module.exports = {
	read,
	write
};
