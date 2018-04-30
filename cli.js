#!/usr/bin/env node
'use strict';

// Overload console.log for testing
require('./log');

const importJsx = require('import-jsx');
const { h, render } = require('ink');
const meow = require('meow');
const clear = require('clear');

const Ui = importJsx('./ui');

const cli = meow(
	`
	Usage
	  $ todo 

	Options
	  --noclear doesnt go full screen [Default: false]

	Examples
	  $ todo
	  $ todo --noclear
`,
	{
		flags: {
			noclear: {
				type: 'boolean',
				alias: 'noclear'
			}
		}
	}
);

if (!cli.flags.noclear) {
	clear(); // "Full screen" effect like in vim
}

render(h(Ui, cli.flags));
