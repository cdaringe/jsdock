#!/usr/bin/env node
'use strict'

/**
 * @module cli
 * Accepts one of build, publish, or clean
 *
 * @example
 * $ jsdock build
 * docs build successfully
 * $ jsdoc publish
 */
const cmd = process.argv[2]
const jsdock = require('../src/index')

jsdock[cmd] // eslint-disable-line
