#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const { h, render } = require('ink');
const meow = require('meow');
const clear = require('clear');

const Ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ todo [input]

	Options
	  --name  Lorem ipsum [Default: false]

	Examples
	  $ todo
	  I love Ink
	  $ todo --name=ponies
	  I love ponies
`);

clear(); // "Full screen" effect like in vim
render(h(Ui, cli.flags));
