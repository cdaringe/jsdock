# jsdock

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [ ![Codeship Status for cdaringe/jsdock](https://app.codeship.com/projects/269e2760-8195-0135-24b6-4e7f91221a42/status?branch=master)](https://app.codeship.com/projects/246951)

your favorite way to build & publish [JSDoc](https://www.npmjs.com/package/jsdoc) API documentation.

a zero conf tool for well-styled docs and publishing to gh-pages. stop thinking about it. just write JSDoc and let jsdock do the rest.

## install

`npm install --save-dev jsdock`

## example

- you write a library with JSDoc
- you run `jsdock build` and `jsdock publish`

```json5
// package.json
{
  "scripts": {
    "docs:build": jsdock build, // builds to docs/ dir in project root
    "docs:publish": jsdoc publish, // publish to <user>.github.io/<project>
    "docs:clean": jsdock clean
  }
}
```

currently you must:

- have a README.md
- put your source in `src/`.
  - if you don't like that ^, send me a PR
- use node 7.10.+

## api/demo

see the [api docs](https://cdaringe.github.io/jsdock).

## really?

yes. configuration sucks.  checking it in is totally 2016.

sorry for the confusing name. ;)
