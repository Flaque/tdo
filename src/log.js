const fs = require('fs');
const util = require('util');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, '/debug.log'), {
	flags: 'w'
});

console.log = msg => file.write(util.format(msg) + '\n');
