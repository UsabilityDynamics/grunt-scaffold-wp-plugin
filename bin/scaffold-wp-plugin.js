#!/usr/bin/env node

'use strict';

// Nodejs libs.
var path = require('path');

// External libs.
var hooker = require('hooker');

// This has to be loaded before the "prompt" dep loads it, or colors won't
// get disabled with --no-color correctly.
require('colors');

echo "scaffold wp plugin...";
