#!/usr/bin/env node
'use strict'

require('perish')
const debug = require('debug')('jsdock')

/**
 * @module cli
 * @description
 * Accepts one of build, publish, or clean
 *
 * @example
 * $ jsdock build
 * $ jsdoc publish
 */
const cmd = process.argv[2]
const jsdock = require('../index')

debug('executing cmd: ' + cmd)
jsdock[cmd].bind(jsdock)() // eslint-disable-line
