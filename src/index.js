'use strict'

const path = require('path')
const fs = require('fs-extra')
const pify = require('pify')
const ghPages = require('gh-pages')
const execa = require('execa')
const jsdocBin = require('resolve-jsdoc-bin')
const { Project } = require('counsel/src/Project')
const debug = require('debug')('jsdock')
const util = new Project()

/**
 * @module jsdock
 */
module.exports = {
  /**
   * Clean the jsdoc build folder
   * @returns {Promise}
   */
  async clean () {
    debug('starting clean')
    const { dest } = await this.getDocsMetaData()
    debug('cleaning ' + dest)
    return fs.remove(dest)
  },

  /**
   * @private
   * @description Creates an object describing our JSDoc build
   * @returns {Promise}
   */
  async getDocsMetaData () {
    const targetProjectRoot = await util.findProjectRoot(process.cwd())
    const projectReadmeFilename = path.resolve(targetProjectRoot, 'README.md')
    const jsdocConfigFilename = path.resolve(__dirname, '..', 'assets', 'jsdoc.json')
    const [ configExists, readmeExists ] = await Promise.all([
      fs.exists(projectReadmeFilename),
      fs.exists(jsdocConfigFilename)
    ])
    if (!configExists || !readmeExists) {
      throw new Error('jsdock requires jsdoc.json & project README.md in the root')
    }
    return {
      jsdocConfigFilename,
      projectReadmeFilename,
      sourceDirname: path.resolve(targetProjectRoot, 'src'),
      dest: path.resolve(targetProjectRoot, 'docs'),
      projectRootDirname: targetProjectRoot,
      templateDirname: path.dirname(require.resolve('minami'))
    }
  },

  /**
   * @private
   * @description Executes gh-pages publish
   */
  _ghPublish () {
    return pify(ghPages.publish.bind(ghPages))
  },

  /**
   * Builds API docs with JSDoc.  Puts docs by default into a docs/ directory.
   * @returns {Promise}
   */
  async build (opts) {
    let jsdocBinFilename = jsdocBin.resolve(__dirname)
    try {
      const {
        jsdocConfigFilename,
        projectReadmeFilename,
        dest,
        sourceDirname,
        projectRootDirname,
        templateDirname
      } = await this.getDocsMetaData()
      const cmd = jsdocBinFilename
      const args = [
        '--configure', jsdocConfigFilename,
        '--recurse',
        '--readme', projectReadmeFilename,
        '--template', templateDirname,
        '--destination', dest,
        sourceDirname
      ]
      await this.clean()
      debug('building: ' + cmd + ' ' + args.join(' '))
      let rslt = execa(cmd, args, { cwd: projectRootDirname })
      rslt.stdout.pipe(process.stdout)
      return rslt
    } catch (err) {
      /* istanbul ignore next */
      console.error('jsdock failed to build documentatin via jsdoc')
      throw err
    }
  },

  /**
   * Publish docs to github pages.
   * @returns {Promise}
   */
  async publish () {
    const { dest } = await this.getDocsMetaData()
    debug('publishing docs')
    await this._ghPublish()(dest)
    console.log('docs successfully published')
  }
}
